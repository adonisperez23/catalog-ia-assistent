import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from "https://esm.sh/@supabase/supabase-js@2"
// Importamos el SDK oficial de Google Gen AI compatible con Deno/Supabase
import { GoogleGenAI } from "https://esm.sh/@google/genai"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apiKey, content-type',
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const { mensaje } = await req.json()
    if (!mensaje) {
      return new Response(JSON.stringify({ error: 'Mensaje requerido' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      })
    }

    const GEMINI_API_KEY = Deno.env.get('Dulce-caramelo-api-key')
    if (!GEMINI_API_KEY) {
      throw new Error("La variable GEMINI_API_KEY no está configurada en Supabase.");
    }

    // Inicializamos el cliente oficial de Google Gen AI
    const ai = new GoogleGenAI({ apiKey: GEMINI_API_KEY })

    // 1. Generar Embedding mediante el método nativo del SDK Oficial
    // El SDK se encarga de resolver las rutas correctas y seguras automáticamente
   // 1. Generar el Embedding usando text-embedding-004
    const embeddingResult = await ai.models.embedContent({
      model: 'gemini-embedding-2', 
      contents: mensaje,
    })

    if (!embeddingResult) {
      throw new Error("El SDK de Gemini devolvió una respuesta vacía.");
    }

    // --- EXTRACTOR ULTRA-ELÁSTICO DE VECTORES ---
    // Esta función busca de forma recursiva cualquier arreglo de números dentro del JSON devuelto
    function encontrarVector(obj: any): number[] | null {
      if (Array.isArray(obj) && obj.length > 0 && typeof obj[0] === 'number') {
        return obj;
      }
      if (obj && typeof obj === 'object') {
        for (const key in obj) {
          const resultado = encontrarVector(obj[key]);
          if (resultado) return resultado;
        }
      }
      return null;
    }

    const vectorCompleto = encontrarVector(embeddingResult);

    if (!vectorCompleto) {
      // Imprime el JSON completo en los logs de Supabase para saber exactamente qué respondió Google
      console.error("Estructura exacta recibida de Gemini:", JSON.stringify(embeddingResult));
      throw new Error("La API de Gemini no incluyó un vector numérico válido en ninguna propiedad del JSON.");
    }

    // Truncamos las dimensiones (de 768 a 384) para mantener compatibilidad exacta con tu pgvector actual
    const vector384 = vectorCompleto.slice(0, 384);

    // 2. Inicializar cliente interno de Supabase
    const supabaseUrl = Deno.env.get('SUPABASE_URL') ?? ''
    const supabaseAnonKey = Deno.env.get('SUPABASE_ANON_KEY') ?? ''
    const supabase = createClient(supabaseUrl, supabaseAnonKey)

    // 3. Buscar coincidencias en la Base de Datos usando el vector obtenido
    const { data: productosEncontrados, error: dbError } = await supabase.rpc('buscar_productos', {
      query_embedding: vector384,
      match_threshold: 0.30, 
      match_count: 3
    })

    if (dbError) throw dbError

    // 4. Formatear el contexto extraído de tu catálogo de Dulce Caramelo
    let contexto = "Información real de la tienda Dulce Caramelo:\n"
    if (productosEncontrados && productosEncontrados.length > 0) {
      productosEncontrados.forEach((p: any) => {
        contexto += `- Torta ${p.nombre}: ${p.descripcion}. Precio: $${p.precio}.\n`
      })
    } else {
      contexto += "No se encontraron tortas específicas en el catálogo que coincidan perfectamente.\n"
    }

    // 5. Generar la respuesta de chat amigable usando también el SDK oficial
    const chatResult = await ai.models.generateContent({
      model: 'gemini-3.5-flash',
      contents: `Eres 'Dulce Caramelo', un asistente virtual dulce, amable y experto de una tienda de repostería.
      Tu único objetivo es responder la duda del cliente usando estrictamente la información provista en el Contexto.
      Si te preguntan algo que no está en el contexto, indica con dulzura que no tienes esa información a la mano pero que se puede finiquitar en el WhatsApp al enviar su carrito de compras.
      Sé conciso, amigable y usa muchos emojis pasteleros (🎂, 🧁, ✨).

      Contexto de la tienda:
      ${contexto}

      Pregunta del cliente:
      ${mensaje}`,
    })

    const respuestaBot = chatResult.text

    return new Response(JSON.stringify({ respuesta: respuestaBot }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })

  } catch (error: any) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })
  }
})
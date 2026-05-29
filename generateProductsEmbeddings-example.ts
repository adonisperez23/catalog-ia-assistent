import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import { GoogleGenAI } from "https://esm.sh/@google/genai";
import dotenv from "dotenv";

// 1. Configura tus credenciales (puedes hardcodearlas temporalmente para el script local)
// const SUPABASE_URL = process.env.SUPABASE_URL;
// const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY; // Usa service_role para tener permisos de inserción

const ai = new GoogleGenAI({ apiKey: 'api-googleAi' });
const supabase = createClient(
    "https://tusupabase-id.supabase.co",'secret-key'
    
);

// 2. Define el catálogo de prueba
const productos = [
    {
        nombre: "MiniCake 1.5kg",
        descripcion:
            "Delicioso bizcocho tradicional de vainilla. Ideal para cumpleaños y celebraciones familiares. Rinde entre 10-12 porciones (molde de 12cm diametro x 14cm de alto) estimando porciones estándar de 100g. Es totalmente bajo pedido con 2 días de anticipación para decoraciones sencillas y 3 días para personalizadas. Retiro en local en la Avenida Orinoco frente a Chevrolet o delivery por costo variable según zona. Contiene gluten. Puede ser personalizada a gusto del cliente incluyendo costos adicionales acordados en el momento de realizar el pedido. Para otro tipo de bizcocho como el de chocolate incluye costos adicionales. Papeleria personalizada lleva un coste adicional. Incluye relleno y topper generico. Los sabores disponibles de este modelo son : Vainilla, marmoleada y limon, otros sabores tienen costos adicionales como Chocolate y Red Velve. Los rellenos disponibles para este modelo son : Buttercream vainilla, Buttercream Chocolate, Buttercream Oreo o Arequipe. Otros sabores tienen costos adicionales como los rellenos de Ganache de Parchita, Ganache de Chocolate",
        precio: 25.0,
        categoria: "Tradicional",
    },
    {
        nombre: "Torta 2kg",
        descripcion:
            "Delicioso bizcocho tradicional de vainilla. Ideal para cumpleaños y celebraciones familiares. Rinde 20 porciones (molde de 16cm diametro x 14cm de alto) estimando porciones estándar de 100g. Es totalmente bajo pedido con 2 días de anticipación para decoraciones sencillas y 3 días para personalizadas. Retiro en local en la Avenida Orinoco frente a Chevrolet o delivery por costo variable según zona. Contiene gluten. Puede ser personalizada a gusto del cliente incluyendo costos adicionales acordados en el momento de realizar el pedido. Para otro tipo de bizcocho como el de chocolate incluye costos adicionales. Papeleria personalizada lleva un coste adicional. Incluye relleno y topper generico. Los sabores disponibles de este modelo son : Vainilla, marmoleada y limon, otros sabores tienen costos adicionales como Chocolate y Red Velve. Los rellenos disponibles para este modelo son : Buttercream vainilla, Buttercream Chocolate, Buttercream Oreo o Arequipe. Otros sabores tienen costos adicionales como los rellenos de Ganache de Parchita, Ganache de Chocolate.",
        precio: 35.0,
        categoria: "Tradicional",
    },
    {
        nombre: "Torta 2.5kg",
        descripcion:
            "Delicioso bizcocho tradicional de vainilla. Ideal para cumpleaños y celebraciones familiares. Rinde 25 porciones (molde de 18cm diametro x 14cm de alto) estimando porciones estándar de 100g. Es totalmente bajo pedido con 2 días de anticipación para decoraciones sencillas y 3 días para personalizadas. Retiro en local en la Avenida Orinoco frente a Chevrolet o delivery por costo variable según zona. Contiene gluten. Puede ser personalizada a gusto del cliente incluyendo costos adicionales acordados en el momento de realizar el pedido. Para otro tipo de bizcocho como el de chocolate incluye costos adicionales. Papeleria personalizada lleva un coste adicional. Incluye relleno y topper generico. Los sabores disponibles de este modelo son : Vainilla, marmoleada y limon, otros sabores tienen costos adicionales como Chocolate y Red Velve. Los rellenos disponibles para este modelo son : Buttercream vainilla, Buttercream Chocolate, Buttercream Oreo o Arequipe. Otros sabores tienen costos adicionales como los rellenos de Ganache de Parchita, Ganache de Chocolate.",
        precio: 42.0,
        categoria: "Tradicional",
    },
    {
        nombre: "Torta 3kg",
        descripcion:
            "Delicioso bizcocho tradicional de vainilla. Ideal para cumpleaños y celebraciones familiares. Rinde entre 25 a 30 porciones (molde de 20cm diametro x 14cm de alto) estimando porciones estándar de 100g. Es totalmente bajo pedido con 2 días de anticipación para decoraciones sencillas y 3 días para personalizadas. Retiro en local en la Avenida Orinoco frente a Chevrolet o delivery por costo variable según zona. Contiene gluten. Puede ser personalizada a gusto del cliente incluyendo costos adicionales acordados en el momento de realizar el pedido. Para otro tipo de bizcocho como el de chocolate incluye costos adicionales. Papeleria personalizada lleva un coste adicional. Incluye relleno y topper generico. Los sabores disponibles de este modelo son : Vainilla, marmoleada y limon, otros sabores tienen costos adicionales como Chocolate y Red Velve. Los rellenos disponibles para este modelo son : Buttercream vainilla, Buttercream Chocolate, Buttercream Oreo o Arequipe. Otros sabores tienen costos adicionales como los rellenos de Ganache de Parchita, Ganache de Chocolate." ,
        precio: 44.0,
        categoria: "Tradicional",
    },
    {
        nombre: "Torta 3.5kg",
        descripcion:
            "Delicioso bizcocho tradicional de vainilla. Ideal para cumpleaños y celebraciones familiares. Rinde entre 30 a 35 porciones (molde de 24cm diametro x 14cm de alto) estimando porciones estándar de 100g. Es totalmente bajo pedido con 2 días de anticipación para decoraciones sencillas y 3 días para personalizadas. Retiro en local en la Avenida Orinoco frente a Chevrolet o delivery por costo variable según zona. Contiene gluten. Puede ser personalizada a gusto del cliente incluyendo costos adicionales acordados en el momento de realizar el pedido. Para otro tipo de bizcocho como el de chocolate incluye costos adicionales. Papeleria personalizada lleva un coste adicional. Incluye relleno y topper generico. Los sabores disponibles de este modelo son : Vainilla, marmoleada y limon, otros sabores tienen costos adicionales como Chocolate y Red Velve. Los rellenos disponibles para este modelo son : Buttercream vainilla, Buttercream Chocolate, Buttercream Oreo o Arequipe. Otros sabores tienen costos adicionales como los rellenos de Ganache de Parchita, Ganache de Chocolate.",
        precio: 55.0,
        categoria: "Tradicional",
    },
    {
        nombre: "Torta de piña de 18cm",
        descripcion:
            "Ideal para cumpleaños y celebraciones familiares. Pesa entre 1.8kg a 2kg. Rinde entre 18 a 20 porciones (molde de 18cm diametro x 14cm de alto) estimando porciones estándar de 100g. Es totalmente bajo pedido con 2 días de anticipación para decoraciones sencillas y 3 días para personalizadas. Retiro en local en la Avenida Orinoco frente a Chevrolet o delivery por costo variable según zona. Contiene gluten. Papeleria personalizada lleva un coste adicional. Incluye topper generico",
        precio: 25.0,
        categoria: "Tradicional",
    },
    {
        nombre: "Torta de piña de 24cm",
        descripcion:
            "Ideal para cumpleaños y celebraciones familiares. Pesa entre 2.6kg a 2.8kg. Rinde entre 26 a 28 porciones (molde de 24cm diametro x 14cm de alto) estimando porciones estándar de 100g. Es totalmente bajo pedido con 2 días de anticipación para decoraciones sencillas y 3 días para personalizadas. Retiro en local en la Avenida Orinoco frente a Chevrolet o delivery por costo variable según zona. Contiene gluten. Papeleria personalizada lleva un coste adicional. Incluye topper generico",
        precio: 35.0,
        categoria: "Tradicional",
    },
    {
        nombre: "Torta cuadrada de 20cm x 20cm",
        descripcion:
            "Delicioso bizcocho tradicional de vainilla. Ideal para cumpleaños y celebraciones familiares. Pesa 3kg y rinde 30 porciones (molde de 20cm x 20cm x 14cm de alto) estimando porciones estándar de 100g. Es totalmente bajo pedido con 2 días de anticipación para decoraciones sencillas y 3 días para personalizadas. Retiro en local en la Avenida Orinoco frente a Chevrolet o delivery por costo variable según zona. Contiene gluten. Puede ser personalizada a gusto del cliente incluyendo costos adicionales acordados en el momento de realizar el pedido. Para otro tipo de bizcocho como el de chocolate incluye costos adicionales. Papeleria personalizada lleva un coste adicional. Incluye relleno y topper generico. Los sabores disponibles de este modelo son : Vainilla, marmoleada y limon, otros sabores tienen costos adicionales como Chocolate y Red Velve. Los rellenos disponibles para este modelo son : Buttercream vainilla, Buttercream Chocolate, Buttercream Oreo o Arequipe. Otros sabores tienen costos adicionales como los rellenos de Ganache de Parchita, Ganache de Chocolate.",
        precio: 35.0,
        categoria: "Tradicional",
    },
    {
        nombre: "Torta cuadrada de 25cm x 25cm",
        descripcion:
            "Delicioso bizcocho tradicional de vainilla. Ideal para cumpleaños y celebraciones familiares. Pesa 4.2kg y rinde 42 porciones (molde de 25cm x 25cm x 14cm de alto) estimando porciones estándar de 100g. Es totalmente bajo pedido con 2 días de anticipación para decoraciones sencillas y 3 días para personalizadas. Retiro en local en la Avenida Orinoco frente a Chevrolet o delivery por costo variable según zona. Contiene gluten. Puede ser personalizada a gusto del cliente incluyendo costos adicionales acordados en el momento de realizar el pedido. Para otro tipo de bizcocho como el de chocolate incluye costos adicionales. Papeleria personalizada lleva un coste adicional. Incluye relleno y topper generico. Los sabores disponibles de este modelo son : Vainilla, marmoleada y limon, otros sabores tienen costos adicionales como Chocolate y Red Velve. Los rellenos disponibles para este modelo son : Buttercream vainilla, Buttercream Chocolate, Buttercream Oreo o Arequipe. Otros sabores tienen costos adicionales como los rellenos de Ganache de Parchita, Ganache de Chocolate.",
        precio: 45.0,
        categoria: "Tradicional",
    },
    {
        nombre: "Torta cuadrada de 30cm x 30cm",
        descripcion:
            "Delicioso bizcocho tradicional de vainilla. Ideal para cumpleaños y celebraciones familiares. Pesa 5.3kg y rinde 53 porciones (molde de 30cm x 30cm x 14cm de alto) estimando porciones estándar de 100g. Es totalmente bajo pedido con 2 días de anticipación para decoraciones sencillas y 3 días para personalizadas. Retiro en local en la Avenida Orinoco frente a Chevrolet o delivery por costo variable según zona. Contiene gluten. Puede ser personalizada a gusto del cliente incluyendo costos adicionales acordados en el momento de realizar el pedido. Para otro tipo de bizcocho como el de chocolate incluye costos adicionales. Papeleria personalizada lleva un coste adicional. Incluye relleno y topper generico. Los sabores disponibles de este modelo son : Vainilla, marmoleada y limon, otros sabores tienen costos adicionales como Chocolate y Red Velve. Los rellenos disponibles para este modelo son : Buttercream vainilla, Buttercream Chocolate, Buttercream Oreo o Arequipe. Otros sabores tienen costos adicionales como los rellenos de Ganache de Parchita, Ganache de Chocolate.",
        precio: 60.0,
        categoria: "Tradicional",
    },
];

async function poblarCatalogo() {
  console.log("🎂 Iniciando la generación de embeddings para Dulce Caramelo...")

  // Esta función auxiliar buscará el arreglo de números en CUALQUIER propiedad del JSON
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

  for (const producto of productos) {
    try {
      const textoAEmbedding = `${producto.nombre}: ${producto.descripcion}`

      // Llamamos al modelo text-embedding-004
      const embeddingResult = await ai.models.embedContent({
        model: 'gemini-embedding-2',
        contents: textoAEmbedding,
      })

      // Extraemos el vector usando el buscador elástico recursivo
      const vectorCompleto = encontrarVector(embeddingResult)

      if (!vectorCompleto) {
        console.error(`❌ No se pudo extraer el arreglo numérico del API para: ${producto.nombre}`)
        // Imprimimos la respuesta real de Google para saber qué pasó si falla
        console.error("Respuesta cruda de Gemini:", JSON.stringify(embeddingResult))
        continue
      }

      // Recortar a las primeras 384 dimensiones para pgvector
      const vector384 = vectorCompleto.slice(0, 384)

      // Insertamos directamente en tu tabla de Supabase
      const { error } = await supabase
        .from('productos')
        .insert({
          nombre: producto.nombre,
          descripcion: producto.descripcion,
          precio: producto.precio,
          embedding: vector384
        })

      if (error) {
        console.error(`❌ Error al insertar ${producto.nombre} en Supabase:`, error.message)
      } else {
        console.log(`✅ ¡${producto.nombre} insertada con éxito con su vector de 384 dim!`)
      }

    } catch (err: any) {
      console.error(`❌ Falló por completo el proceso para ${producto.nombre}:`, err.message)
    }
  }
  console.log("✨ Proceso de carga terminado.")
}

poblarCatalogo();

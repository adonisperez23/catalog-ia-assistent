<template>
    <!-- Botón Flotante (Trigger) -->
    <ChatIndicator />
    <button
        @click="_toggle_chat = !_toggle_chat"
        id="chat-trigger"
        class="chat-fab"
    >
        <span class="icon">🎂</span>
    </button>

    <!-- Contenedor del Chat -->
    <div v-if="_toggle_chat" id="chat-container" class="chat-window">
        <div class="chat-header"></div>

        <div ref="contenedorChat" id="chat-messages" class="chat-body">
            <!-- Mensaje de bienvenida -->
            <div v-for="mensaje in historialMensajes" class="message bot">
                {{ mensaje.texto }}
            </div>
            <div class="message bot" v-if="estaCargando">
                Cargando respuesta...
            </div>
        </div>

        <div class="chat-footer bg-[#00C7C7]">
            <input
                @keydown.enter="enviarMensajeAAnfitrion"
                v-model="mensajeUsuario"
                type="text"
                id="chat-input"
                placeholder="Escribe tu duda aquí..."
                autocomplete="off"
                class="message bot"
            />
            <button @click="enviarMensajeAAnfitrion" id="send-btn">
                <svg class="" viewBox="0 0 24 24" width="20" height="20">
                    <path
                        fill="black"
                        d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"
                    ></path>
                </svg>
            </button>
        </div>
    </div>
</template>

<script setup lang="ts">
const _toggle_chat = ref(false);

import { ref, nextTick } from "vue";
import ChatIndicator from "./ChatIndicator.vue";

// 1. Definición de la estructura de cada mensaje
interface Mensaje {
    id: number;
    remitente: "usuario" | "bot";
    texto: string;
}

// 2. Declaración de variables reactivas que faltaban
const historialMensajes = ref<Mensaje[]>([
    {
        id: 1,
        remitente: "bot",
        texto: "¡Hola! Bienvenido a Dulce Caramelo 🎂. ¿En qué te puedo ayudar hoy? Te puedo asesorar con porciones, sabores o logística de entrega ✨.",
    },
]);
const mensajeUsuario = ref("");
const estaCargando = ref(false);
const contenedorChat = ref<HTMLElement | null>(null);

// 3. Función auxiliar para hacer scroll automático al recibir nuevos mensajes
const hacerScrollAlFinal = async () => {
    await nextTick();
    if (contenedorChat.value) {
        contenedorChat.value.scrollTop = contenedorChat.value.scrollHeight;
    }
};

// 4. Función principal de envío corregida y enlazada a Supabase
const enviarMensajeAAnfitrion = async () => {
    // Validar que el mensaje no esté vacío y que no haya otra petición en curso
    if (!mensajeUsuario.value.trim() || estaCargando.value) return;

    const textoEnviar = mensajeUsuario.value;

    // Agregar el mensaje del usuario al historial en pantalla
    historialMensajes.value.push({
        id: Date.now(),
        remitente: "usuario",
        texto: textoEnviar,
    });

    // Limpiar el campo de texto y activar el estado de carga (animación de "escribiendo...")
    mensajeUsuario.value = "";
    estaCargando.value = true;
    hacerScrollAlFinal();

    try {
        // Reemplaza esto con la URL real que te asignó Supabase al desplegar tu Edge Function
        const URL_PRODUCTION = `https://${import.meta.env.VITE_SUPABASE_ID}.supabase.co/functions/v1/chatbot-dulce-caramelo`;

        const respuesta = await fetch(URL_PRODUCTION, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
            },
            body: JSON.stringify({ mensaje: textoEnviar }),
        });

        if (!respuesta.ok) {
            throw new Error("Error en la respuesta del servidor");
        }

        const datos = await respuesta.json();

        // Insertar la respuesta dulce del bot en el chat
        historialMensajes.value.push({
            id: Date.now() + 1,
            remitente: "bot",
            texto:
                datos.respuesta ||
                "¡Ups! No pude procesar tu dulce consulta. Inténtalo de nuevo. 🧁",
        });
    } catch (error) {
        console.error("Error en el chatbot:", error);
        historialMensajes.value.push({
            id: Date.now() + 1,
            remitente: "bot",
            texto: "Hubo un pequeño problema técnico en la cocina del chat. ¡Prueba de nuevo pronto! 🍰",
        });
    } finally {
        estaCargando.value = false;
        hacerScrollAlFinal();
    }
};
</script>

<style scoped>
:root {
    --primary-color: #ff85a1; /* Rosa pastel */
    --bg-bot: #f0f2f5;
    --bg-user: #ff85a1;
    --text-user: white;
}

/* Botón flotante */
.chat-fab {
    position: fixed;
    bottom: 20px;
    right: 20px;
    width: 60px;
    height: 60px;
    border-radius: 50%;
    background: var(--primary-color);
    border: none;
    cursor: pointer;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    font-size: 28px;
    z-index: 1000;
    transition: transform 0.2s;
}

.chat-fab:hover {
    transform: scale(1.1);
}

/* Ventana de chat */
.chat-window {
    position: fixed;
    bottom: 90px;
    right: 20px;
    width: 350px;
    max-height: 500px;
    height: 80vh;
    background: #ffb6c1;
    border-radius: 15px;
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.2);
    display: flex;
    flex-direction: column;
    overflow: hidden;
    z-index: 1000;
    transition: all 0.3s ease;
}

.hidden {
    display: none;
    opacity: 0;
    transform: translateY(20px);
}

/* Cabecera */
.chat-header {
    background: var(--primary-color);
    color: white;
    padding: 15px;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.status-dot {
    width: 8px;
    height: 8px;
    background: #4eff4e;
    border-radius: 50%;
    display: inline-block;
    margin-right: 8px;
}

/* Cuerpo de mensajes */
.chat-body {
    flex: 1;
    padding: 15px;
    overflow-y: auto;
    background: #fdfdfd;
    display: flex;
    flex-direction: column;
    gap: 10px;
}

.message {
    max-width: 80%;
    padding: 10px 14px;
    border-radius: 15px;
    font-size: 0.9rem;
    line-height: 1.4;
}

.bot {
    background: var(--bg-bot);
    align-self: flex-start;
    border-bottom-left-radius: 2px;
}
.user {
    background: var(--bg-user);
    color: var(--text-user);
    align-self: flex-end;
    border-bottom-right-radius: 2px;
}

/* Pie de chat */
.chat-footer {
    padding: 15px;
    border-top: 1px solid #eee;
    display: flex;
    gap: 10px;
}

#chat-input {
    flex: 1;
    border: 1px solid #ddd;
    padding: 8px 12px;
    border-radius: 20px;
    outline: none;
}
</style>

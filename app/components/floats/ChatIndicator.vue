<template>
    <div class="chatbot-container">
        <div class="indicacion-chat">
            ¡Preguntale a nuestra IA! ✨
        </div>

        <button
            class="btn-cake-chatbot"
            onclick="alert('Desplegando CakeChatbot... 🧁🤖')"
        >
            🎂
        </button>
    </div>
</template>

<script setup lang="ts"></script>

<style scoped>
/* Contenedor flotante en la esquina inferior derecha */
.chatbot-container {
    position: fixed;
    bottom: 20px;
    right: 20px;
    display: flex;
    align-items: center;
    gap: 12px;
    z-index: 1000;
}

/* Indicación/Tooltip flotando a la izquierda del botón */
.indicacion-chat {
    background-color: #ff1493;
    color: white;
    padding: 8px 14px;
    border-radius: 8px;
    font-size: 14px;
    font-weight: bold;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.15);
    white-space: nowrap;
}

/* Botón circular del CakeChatbot */
.btn-cake-chatbot {
    background-color: #f48fb1;
    font-size: 28px;
    border: none;
    width: 60px;
    height: 60px;
    border-radius: 50%;
    cursor: pointer;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
    transition: transform 0.2s;
    display: flex;
    justify-content: center;
    align-items: center;
}

.btn-cake-chatbot:hover {
    transform: scale(1.1);
    background-color: #ec407a;
}
</style>

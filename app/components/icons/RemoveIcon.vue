<template>
    <svg
        v-if="!small"
        width="24"
        height="25"
        viewBox="0 0 24 25"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
    >
        <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M6 12.5C6 11.9477 6.44772 11.5 7 11.5H17C17.5523 11.5 18 11.9477 18 12.5C18 13.0523 17.5523 13.5 17 13.5H7C6.44772 13.5 6 13.0523 6 12.5Z"
            fill="#858589"
        />
    </svg>
    <svg
        v-else
        width="16"
        height="17"
        viewBox="0 0 16 17"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
    >
        <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M4 8.50004C4 8.13185 4.29848 7.83337 4.66667 7.83337H11.3333C11.7015 7.83337 12 8.13185 12 8.50004C12 8.86823 11.7015 9.16671 11.3333 9.16671H4.66667C4.29848 9.16671 4 8.86823 4 8.50004Z"
            fill="#858589"
        />
    </svg>
</template>

<script setup lang="ts">
defineProps<{
    small?: boolean;
}>();
</script>

<style scoped></style>

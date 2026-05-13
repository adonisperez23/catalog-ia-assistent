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
            d="M12 6.5C12.5523 6.5 13 6.94772 13 7.5V11.5H17C17.5523 11.5 18 11.9477 18 12.5C18 13.0523 17.5523 13.5 17 13.5H13V17.5C13 18.0523 12.5523 18.5 12 18.5C11.4477 18.5 11 18.0523 11 17.5V13.5H7C6.44772 13.5 6 13.0523 6 12.5C6 11.9477 6.44772 11.5 7 11.5H11V7.5C11 6.94772 11.4477 6.5 12 6.5Z"
            fill="#333333"
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
            d="M8 4.5C8.36819 4.5 8.66667 4.79848 8.66667 5.16667V7.83333H11.3333C11.7015 7.83333 12 8.13181 12 8.5C12 8.86819 11.7015 9.16667 11.3333 9.16667H8.66667V11.8333C8.66667 12.2015 8.36819 12.5 8 12.5C7.63181 12.5 7.33333 12.2015 7.33333 11.8333V9.16667H4.66667C4.29848 9.16667 4 8.86819 4 8.5C4 8.13181 4.29848 7.83333 4.66667 7.83333H7.33333V5.16667C7.33333 4.79848 7.63181 4.5 8 4.5Z"
            fill="#333333"
        />
    </svg>
</template>

<script setup lang="ts">
defineProps<{
    small?: boolean;
}>();
</script>

<style scoped></style>

<template>
    <button
        :disabled="disabled"
        class="flex justify-around items-center rounded-[6px] w-full h-[48px] bg-[#FFBC0D] border border-[#522711] text-[#522711]"
    >
        <h3>{{ text }}</h3>
    </button>
</template>

<script setup lang="ts">
defineProps<{
    text: string;
    disabled?: boolean;
}>();
</script>

<style scoped></style>

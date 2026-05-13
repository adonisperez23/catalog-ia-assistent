<template>
    <button
        :disabled="disabled"
        :class="[
            'flex justify-center items-center size-[20px] rounded-[6px] border',
            disabled ? 'border-[#D7D7D7]' : 'border-[#333333]',
        ]"
    >
        <div
            v-if="checked"
            class="size-[12px] bg-[#117554] rounded-[3px]"
        ></div>
    </button>
</template>

<script setup lang="ts">
defineProps<{
    checked?: boolean;
    disabled?: boolean;
}>();
</script>

<style scoped></style>

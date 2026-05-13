<template>
    <div
        :class="[
            'flex justify-around items-center rounded-[6px] w-[96px] h-[48px] bg-[#D7D7D7]',
            {
                '!w-[75px] !h-[25px]': small,
            },
        ]"
    >
        <button v-show="!only_amount" @click="$emit('remove')"><RemoveIcon :small="small" /></button>
        <p v-if="!small">{{ amount }}</p>
        <h5 v-else>{{ amount }}</h5>
        <button v-show="!only_amount" @click="$emit('add')"><AddIcon :small="small" /></button>
    </div>
</template>

<script setup lang="ts">
import AddIcon from "../icons/AddIcon.vue";
import RemoveIcon from "../icons/RemoveIcon.vue";

defineProps<{
    amount: number;
    small?: boolean;
    only_amount?:boolean;
}>();

defineEmits(["remove", "add"]);
</script>

<style scoped></style>

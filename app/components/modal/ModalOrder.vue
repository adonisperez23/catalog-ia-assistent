<template>
    <div
        class="fixed inset-0 z-2 flex justify-center items-center bg-[rgba(51,51,51,0.7)] text-[#333333]"
    >
        <div
            @click.stop="$emit('close')"
            class="flex justify-center items-center w-full"
        >
            <div
                @click.stop
                class="flex flex-col gap-[32px] w-full h-dvh sm:w-[430px] sm:h-fit bg-[#FFFFF6] sm:rounded-[12px] p-[32px]"
            >
                <div class="flex justify-between items-center">
                    <h2>Tu Pedido</h2>
                    <button @click="$emit('close')">
                        <CloseIcon />
                    </button>
                </div>
                <div
                    class="flex flex-col justify-between items-start gap-[32px] overflow-auto max-h-[500px]"
                >
                    <div
                        v-for="(order, index) in cart"
                        class="flex justify-between items-start gap-[8px] w-full"
                    >
                        <div class="flex justify-center items-start gap-[8px]">
                            <picture>
                                <source
                                    type="image/avif"
                                    :srcset="order.product.img_avif_url"
                                />
                                <source
                                    type="image/jpeg"
                                    :srcset="order.product.img_url"
                                />
                                <img
                                    v-if="order.product_type === 'Plato'"
                                    :src="order.product.img_url"
                                    class="w-[73px] h-[72px] border border-[#D7D7D7] object-cover rounded-[8px]"
                                    loading="lazy"
                                />
                            </picture>
                            <div class="flex flex-col gap-[8px]">
                                <p>{{ order.product.name }}</p>
                                <h5>${{ order.sub_total }}</h5>
                                <h6>{{ order.describirContornos() }}</h6>

                                <div
                                    class="flex justify-start items-center gap-[8px]"
                                >
                                    <h6
                                        v-if="order.product_type === 'Plato'"
                                        @click="
                                            $store_manager.onOpenModal(
                                                'SELECTED_PRODUCT_EDITING',
                                                undefined,
                                                order,
                                                index
                                            )
                                        "
                                        class="underline cursor-pointer"
                                    >
                                        Editar
                                    </h6>
                                    <h6
                                        @click="
                                            $store_manager.deleteProduct(index)
                                        "
                                        class="underline cursor-pointer"
                                    >
                                        Eliminar
                                    </h6>
                                </div>
                            </div>
                        </div>
                        <div
                            v-if="order.product_type !== 'Delivery'"
                            class="flex justify-center items-start"
                        >
                            <AmountBtn
                                @add="order.addProduct(1)"
                                @remove="order.removeProduct()"
                                :amount="order.amount"
                                small
                            />
                        </div>
                    </div>
                </div>
                <!-- <div class="flex flex-col gap-[16px]">
                    <div class="flex justify-between items-center">
                        <h5>Subtotal</h5>
                        <h5>${{ _sub_total_amount }}</h5>
                    </div>
                </div> -->
                <div
                    class="fixed bottom-0 left-0 z-1 shadow-[0_25px_50px_-12px] sm:shadow-none sm:static bg-[white] w-full p-[16px] sm:p-0 sm:bg-[#FFFFF6] flex flex-col gap-[16px]"
                >
                    <div class="flex justify-between items-center">
                        <h4 class="font-semibold">Total</h4>
                        <h3>${{ total_amount }}</h3>
                    </div>
                    <MainBtn
                        :disabled="disabledSendOrder"
                        text="Enviar pedido"
                        @click="sendOrder"
                    />
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import type { ProductOrder } from "~/types/ProductOrder";
import AmountBtn from "../buttons/AmountBtn.vue";
import MainBtn from "../buttons/MainBtn.vue";
import CloseIcon from "../icons/CloseIcon.vue";

const $emit = defineEmits(["close"]);

const $store_manager = useStore();

const cart = computed(() => {
    // let ordened_cart: ProductOrder[] = [
    //     ...$store_manager.value.getCart(),
    //     ...$store_manager.value.getSecondaryProductsCart(),
    // ];
    return $store_manager.value.getCart();
});

const total_amount = computed(() => {
    return $store_manager.value.total;
});

const disabledSendOrder = computed(() => {
    return $store_manager.value.cart.length === 0;
});

function sendOrder() {
    const MENSAJE = $store_manager.value.setMessageOrder();
    const MENSAJE_ENCODED = encodeURIComponent(MENSAJE);
    console.log(MENSAJE, MENSAJE_ENCODED);
    window.open(
        `https://api.whatsapp.com/send?phone=584148787913&text=${MENSAJE_ENCODED}+`
    );
}

// function closeModal() {
//     useHead({
//         bodyAttrs: {
//             style: { overflow: "auto" },
//         },
//     });
//     $emit("close");
// }

// //cuando este abierto se oculta el scroll de la pagina principal
// useHead({
//     bodyAttrs: {
//         style: { overflow: "hidden" },
//     },
// });
</script>

<style scoped></style>

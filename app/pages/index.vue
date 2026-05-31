<template>
    <div class="bg-[#FFFFF6]">
        <div
            ref="_navbar"
            id="navbar"
            :class="[
                'w-full h-[88px] bg-[#FF1493] flex justify-center fixed top-0  z-2',
                {
                    'hidden-navbar ': _is_hidden,
                },
            ]"
        >
            <div
                class="flex justify-between items-center w-full sm:w-[1024px] px-[16px]"
            >
                <img
                    src="/icons/logodulce-caramelo.svg"
                    alt=""
                    height="120"
                    width="170"
                />
                <div class="flex justify-between items-center sm:gap-[16px]">
                    <a class="invisible w-0 sm:w-full sm:visible" href="#menu"
                        >Menu</a
                    >
                    <a
                        href="https://api.whatsapp.com/send?phone=584148787913"
                        class="invisible w-0 sm:w-full sm:visible"
                        >Whatsapp</a
                    >
                    <button
                        @click="
                            $store_manager.onOpenModal(
                                'ORDER_MODAL',
                                undefined,
                                undefined,
                                undefined,
                            )
                        "
                        class="flex justify-center items-center gap-[8px] h-[48px] sm:px-[32px] px-[16px] py-[12px] rounded-[6px] bg-[#00FFFF] text-[black] hover:translate-y-[-6px]"
                    >
                        🎂
                        <div class="whitespace-nowrap">
                            Mi pedido ({{ $store_manager.cart.length }})
                        </div>
                    </button>
                </div>
            </div>
        </div>

        <div class="my-[64px] mt-[128px] pt-[32px]">
            <div class="flex justify-center">
                <div class="flex flex-col text-center gap-[32px]">
                    <div class="flex flex-col gap-[16px]">
                        <h1 class="text-[#333333]">¿Que torta deseas pedir?</h1>
                        <p class="text-[#333333]">
                            Escoge la torta perfecta para tus celebraciones.
                        </p>
                    </div>
                    <div
                        class="flex flex-col justify-center items-center gap-[16px]"
                    >
                        <a
                            href="#menu"
                            class="flex justify-center items-center gap-[8px] w-[224px] h-[56px] px-[32px] py-[16px] rounded-[12px] bg-[#FFB6C1] text-[#522711] scroll-smooth"
                        >
                            🎂
                            <p class="whitespace-nowrap">Empezar pedido</p>
                        </a>
                        <h6 class="text-[#333333]">
                            Los pedidos se envían por WhatsApp. No necesitas
                            registrarte. 👀
                        </h6>
                    </div>
                </div>
            </div>
        </div>
        <div class="flex justify-center">
            <div
                class="flex flex-col justify-center items-start max-w-[1024px] my-[64px]"
            >
                <div id="menu" class="flex mb-[64px]">
                    <h2>Catalogo</h2>
                </div>
                <div
                    class="flex flex-col justify-center items-center sm:grid sm:grid-cols-3 gap-x-[32px] gap-y-[64px]"
                >
                    <ProductCard
                        v-for="(product, index) in $store_manager.products"
                        :key="index"
                        v-bind="product"
                        @click="
                            $store_manager.onOpenModal(
                                'SELECTED_PRODUCT',
                                product,
                                undefined,
                                undefined,
                            )
                        "
                    />
                </div>
            </div>
        </div>

        <div
            class="flex justify-center h-[270px] bg-[#FF1493] text-[white] px-[16px]"
        >
            <div class="flex justify-between items-center w-[1024px] my-[64px]">
                <div class="flex flex-col gap-[16px]">
                    <img
                        src="/icons/logodulce-caramelo.svg"
                        alt=""
                        height="130"
                        width="170"
                    />
                </div>
                <div class="flex flex-col justify-center items-end gap-[16px]">
                    <h4>Contacto</h4>
                    <p class="text-end">
                        Sigue disfrutando en nuestras redes sociales
                    </p>
                    <div class="flex justify-center gap-[16px]">
                        <a
                            href="https://www.instagram.com/dullcecaramelo/"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <InstagramIcon />
                        </a>
                        <a
                            target="_blank"
                            href="https://api.whatsapp.com/send?phone=584148787913"
                        >
                            <WhasappIcon />
                        </a>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <FloatChat />
    <ModalOrder
        @close="$store_manager.onCloseModal()"
        v-if="$store_manager.modal_on === 'ORDER_MODAL'"
    />
    <ModalProduct
        v-if="
            $store_manager.modal_on === 'SELECTED_PRODUCT' ||
            $store_manager.modal_on === 'SELECTED_PRODUCT_EDITING'
        "
        @close="$store_manager.onCloseModal()"
    />
</template>

<script setup lang="ts">
import FloatChat from "~/components/floats/FloatChat.vue";
import FoodIcon from "~/components/icons/FoodIcon.vue";
import ForkIcon from "~/components/icons/ForkIcon.vue";
import InstagramIcon from "~/components/icons/InstagramIcon.vue";
import WhasappIcon from "~/components/icons/WhasappIcon.vue";
import ProductCard from "~/components/menu/ProductCard.vue";

useSeoMeta({
    title: "Dulce Caramelo",
    ogTitle: "Dulce Caramelo",
    description: "Ricas tortas para tus celebraciones y eventos",
    ogDescription: "Ricas tortas para tus celebraciones y eventos",
    ogImage: "/icons/logodulce-caramelo.svg",
});

useHead({
    link: [
        {
            rel: "icon",
            type: "image/x-icon",
            href: "/icons/logodulce-caramelo.svg",
        },
    ],
});

const $store_manager = useStore();

const _is_hidden = ref(true);
const _is_scroll_up = ref(false);
const _is_at_top = ref(true);
let lastScrollY: number = window.scrollY;

function checkScrollDirection() {
    const currentScrollY = window.scrollY;
    if (currentScrollY > lastScrollY) {
        // Scroll hacia abajo
        _is_hidden.value = true;
        _is_scroll_up.value = false;
        _is_at_top.value = false;
    } else {
        // Scroll hacia arriba
        _is_hidden.value = false;
        if (currentScrollY > 0 && window.innerWidth > 600) {
            _is_scroll_up.value = true;
            _is_at_top.value = false;
        } else {
            _is_scroll_up.value = false;
            _is_at_top.value = true;
        }
    }
    lastScrollY = currentScrollY;
}

// function closeModal() {
//     $store_manager.value.modalStateChange(null);
//     useHead({
//         bodyAttrs: {
//             style: { overflow: "auto" },
//         },
//     });
// }

// function openModal(product: Product) {
//     $store_manager.value.selectProduct(new ProductOrder(product));
//     $store_manager.value.modalStateChange("SELECTED_PRODUCT");
//     useHead({
//         bodyAttrs: {
//             style: { overflow: "hidden" },
//         },
//     });
// }

checkScrollDirection();

onMounted(() => {
    window.addEventListener("scroll", checkScrollDirection);
});
onUnmounted(() => {
    window.removeEventListener("scroll", checkScrollDirection);
});
</script>

<style scoped>
#navbar {
    transition:
        transform 0.3s,
        top 0.3s,
        background 0.3s;
}
#navbar.hidden-navbar {
    transform: translateY(-100%);
}
</style>

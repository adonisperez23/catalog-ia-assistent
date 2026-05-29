<template>
    <Teleport to="#teleports">
        <div
            @click.stop="$emit('close')"
            class="fixed inset-0 z-2 flex justify-center items-center bg-[rgba(51,51,51,0.7)] text-[#333333]"
        >
            <div
                @click.stop
                class="flex flex-col items-start w-[800px] h-dvh sm:h-fit bg-[#FFFFF6] p-[32px] rounded-[12px] relative"
            >
                <div class="visible sm:invisible h-[239px] absolute inset-0">
                    <picture>
                        <source
                            type="image/avif"
                            :srcset="
                                $store_manager.product_selected.product
                                    .img_avif_url
                            "
                        />
                        <source
                            type="image/jpeg"
                            :srcset="
                                $store_manager.product_selected.product.img_url
                            "
                        />
                        <img
                            :src="
                                $store_manager.product_selected.product.img_url
                            "
                            class="object-cover h-[239px] w-full"
                            loading="lazy"
                        />
                    </picture>
                </div>
                <div
                    class="sm:hidden absolute inset-0 h-[240px] w-full bg-linear-to-b from-[transparent] to-[white]"
                ></div>
                <button @click="$emit('close')" class="self-end mb-[16px] z-1">
                    <CloseIcon />
                </button>
                <div class="sm:grid sm:grid-cols-2 gap-[32px] w-full">
                    <div class="hidden sm:flex">
                        <picture>
                            <source
                                type="image/avif"
                                :srcset="
                                    $store_manager.product_selected.product
                                        .img_avif_url
                                "
                            />
                            <source
                                type="image/jpeg"
                                :srcset="
                                    $store_manager.product_selected.product
                                        .img_url
                                "
                            />
                            <img
                                :src="
                                    $store_manager.product_selected.product
                                        .img_url
                                "
                                class="size-[352px] border border-[#D7D7D7] rounded-[16px] object-cover"
                                loading="lazy"
                            />
                        </picture>
                    </div>
                    <div
                        class="flex flex-col gap-[32px] pt-[140px] sm:pt-0 max-h-[700px]"
                    >
                        <div class="flex flex-col justify-center">
                            <h2 class="z-1">
                                {{
                                    $store_manager.product_selected.product.name
                                }}
                            </h2>
                            <p class="text-[#858589]">
                                {{
                                    $store_manager.product_selected.describirContornos()
                                }}
                            </p>
                        </div>
                        <!-- <div class="flex flex-col gap-[32px] overflow-auto">
                            <div
                                v-if="
                                    !$store_manager.product_selected
                                        .is_product_without_contorno
                                "
                                class="flex flex-col justify-center gap-[16px]"
                            >
                                <div class="flex justify-between items-center">
                                    <h4>
                                        Contornos ({{
                                            $store_manager.product_selected
                                                .contornos.size
                                        }}/3)
                                    </h4>
                                    <div
                                        class="flex justify-center items-center gap-[8px]"
                                    >
                                        <div
                                            v-if="
                                                !$store_manager.product_selected
                                                    .can_add_order
                                            "
                                            class="flex justify-center items-center w-[75px] h-[23px] bg-[#D7D7D7] rounded-[6px]"
                                        >
                                            <h6>Requerido</h6>
                                        </div>
                                        <button
                                            @click="
                                                _show_contornos =
                                                    !_show_contornos
                                            "
                                        >
                                            <ArrowUpIcon
                                                v-if="_show_contornos"
                                            />
                                            <ArrowDownIcon v-else />
                                        </button>
                                    </div>
                                </div>
                                <div
                                    v-if="_show_contornos"
                                    v-for="(
                                        contorno, index
                                    ) in $store_manager.getSecondaryProducts(
                                        'Contorno'
                                    )"
                                    :key="index"
                                    class="flex justify-between items-center"
                                >
                                    <h5
                                        :class="{
                                            'text-[#D7D7D7]':
                                                !$store_manager.product_selected.contornos.has(
                                                    contorno.name
                                                ) &&
                                                $store_manager.product_selected
                                                    .contornos.size === 3,
                                        }"
                                    >
                                        {{ contorno.name }}
                                    </h5>
                                    <CheckBox
                                        :key="index"
                                        @click="
                                            $store_manager.product_selected.addContorno(
                                                contorno.name
                                            )
                                        "
                                        :checked="
                                            $store_manager.product_selected.contornos.has(
                                                contorno.name
                                            )
                                        "
                                        :disabled="
                                            !$store_manager.product_selected.contornos.has(
                                                contorno.name
                                            ) &&
                                            $store_manager.product_selected
                                                .contornos.size === 3
                                        "
                                    />
                                </div>
                            </div>
                            <div
                                class="flex flex-col justify-center gap-[16px]"
                            >
                                <div class="flex justify-between items-center">
                                    <h4>Bebidas</h4>
                                    <div
                                        class="flex justify-center items-center gap-[8px]"
                                    >
                                        <button
                                            @click="
                                                _show_bebidas = !_show_bebidas
                                            "
                                        >
                                            <ArrowUpIcon v-if="_show_bebidas" />
                                            <ArrowDownIcon v-else />
                                        </button>
                                    </div>
                                </div>
                                <div
                                    v-if="_show_bebidas"
                                    v-for="(
                                        bebida, index
                                    ) in $store_manager.getSecondaryProducts(
                                        'Bebida'
                                    )"
                                    :key="index"
                                    class="flex justify-between items-center"
                                >
                                    <h5>{{ bebida.name }}</h5>
                                    <div
                                        class="flex justify-center items-center gap-[12px]"
                                    >
                                        <h5>${{ bebida.price }}</h5>
                                        <CheckBox
                                            @click="
                                                $store_manager.addSecondaryProductToOrder(
                                                    bebida
                                                )
                                            "
                                            :checked="
                                                $store_manager.checkSecondaryProductSelected(
                                                    bebida
                                                )
                                            "
                                        />
                                    </div>
                                </div>
                            </div>

                            <div
                                class="flex flex-col justify-center gap-[16px]"
                            >
                                <div class="flex justify-between items-center">
                                    <h4>Extras</h4>
                                    <div
                                        class="flex justify-center items-center gap-[8px]"
                                    >
                                        <button
                                            @click="
                                                _show_extras = !_show_extras
                                            "
                                        >
                                            <ArrowUpIcon v-if="_show_extras" />
                                            <ArrowDownIcon v-else />
                                        </button>
                                    </div>
                                </div>
                                <div
                                    v-if="_show_extras"
                                    v-for="extra in $store_manager.getSecondaryProducts(
                                        'Extra'
                                    )"
                                    class="flex justify-between items-center"
                                >
                                    <h5>{{ extra.name }}</h5>
                                    <div
                                        class="flex justify-center items-center gap-[12px]"
                                    >
                                        <h5>${{ extra.price }}</h5>
                                        <CheckBox
                                            @click="
                                                $store_manager.addSecondaryProductToOrder(
                                                    extra
                                                )
                                            "
                                            :checked="
                                                $store_manager.checkSecondaryProductSelected(
                                                    extra
                                                )
                                            "
                                        />
                                    </div>
                                </div>
                            </div>
                            <div
                                class="flex flex-col justify-center gap-[16px] mb-[132px] sm:mb-0"
                            >
                                <div class="flex justify-between items-center">
                                    <h4>Delivery</h4>
                                    <div
                                        class="flex justify-center items-center gap-[8px]"
                                    >
                                        <button
                                            @click="
                                                _show_extras = !_show_extras
                                            "
                                        >
                                            <ArrowUpIcon v-if="_show_extras" />
                                            <ArrowDownIcon v-else />
                                        </button>
                                    </div>
                                </div>

                                <div
                                    v-if="_show_delivery"
                                    v-for="delivery in $store_manager.getSecondaryProducts(
                                        'Delivery'
                                    )"
                                    class="flex justify-between items-center"
                                >
                                    <h5>{{ delivery.name }}</h5>
                                    <div
                                        class="flex justify-center items-center gap-[12px]"
                                    >
                                        <h5>${{ delivery.price }}</h5>
                                        <CheckBox
                                            @click="
                                                $store_manager.addSecondaryProductToOrder(
                                                    delivery
                                                )
                                            "
                                            :checked="
                                                $store_manager.checkSecondaryProductSelected(
                                                    delivery
                                                )
                                            "
                                        />
                                    </div>
                                </div>
                            </div>
                        </div> -->

                        <div
                            class="fixed bottom-0 left-0 p-[16px] gap-[16px] z-1 shadow-[0_25px_50px_-12px] flex flex-col bg-[white] w-full sm:p-0 sm:static sm:gap-[32px] sm:shadow-none sm:bg-[#FFFFF6]"
                        >
                            <div class="flex justify-between items-center">
                                <div class="flex flex-col gap-[8px]">
                                    <h5 class="">
                                        <strong
                                            >{{
                                                $store_manager.product_selected
                                                    .amount
                                            }}
                                            productos</strong
                                        >
                                    </h5>
                                </div>
                                <h2 class="">
                                    ${{
                                        $store_manager.product_selected
                                            .sub_total
                                    }}
                                </h2>
                            </div>
                            <div
                                class="flex justify-between items-center gap-[16px]"
                            >
                                <AmountBtn
                                    @add="
                                        $store_manager.product_selected.addProduct()
                                    "
                                    @remove="
                                        $store_manager.product_selected.removeProduct()
                                    "
                                    :amount="
                                        $store_manager.product_selected.amount
                                    "
                                />

                                <MainBtn
                                    class="hover:translate-y-[-4px]"
                                    :text="
                                        $store_manager.modal_on ===
                                        'SELECTED_PRODUCT_EDITING'
                                            ? 'Actualizar'
                                            : 'Agregar'
                                    "
                                    @click="AddProductToStore"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </Teleport>
</template>

<script setup lang="ts">
import AmountBtn from "../buttons/AmountBtn.vue";
import MainBtn from "../buttons/MainBtn.vue";
import ArrowUpIcon from "../icons/ArrowUpIcon.vue";
import CloseIcon from "../icons/CloseIcon.vue";
import CheckBox from "../buttons/CheckBox.vue";
import ArrowDownIcon from "../icons/ArrowDownIcon.vue";
import { Teleport } from "vue";

const $emit = defineEmits(["close"]);

const $store_manager = useStore();

const _show_contornos = ref(true);
const _show_bebidas = ref(true);
const _show_extras = ref(true);
const _show_delivery = ref(true);

function AddProductToStore() {
    if ($store_manager.value.modal_on === "SELECTED_PRODUCT_EDITING") {
        $store_manager.value.editProductOrder(
            $store_manager.value.product_selected,
        );
    } else {
        $store_manager.value.addProductOrder(
            $store_manager.value.product_selected,
        );
    }

    $emit("close");
}
</script>

<style scoped></style>

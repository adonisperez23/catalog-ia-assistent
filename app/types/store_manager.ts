import type { Modal } from "./modal";
import type { Product } from "./Product";
import { ProductOrder } from "./ProductOrder";

export class StoreManager {
    public products: Product[];
    public secondary_products: Product[];
    public cart: ProductOrder[] = [];
    // public is_editing_product: boolean = false;
    public modal_on: Modal = null;
    public product_selected: ProductOrder;
    public product_editing_index: number = 1;

    constructor(products: Product[], secondary_products: Product[]) {
        this.products = products;
        this.secondary_products = secondary_products;
        this.product_selected = new ProductOrder();
    }

    get totalProducts(): number {
        return this.cart.reduce(
            (acum, product_order) => (acum += product_order.amount),
            0
        );
    }

    get total(): number {
        return Number(
            this.cart
                .reduce(
                    (total, product) => (total = total + product.sub_total),
                    0
                )
                .toFixed(2)
        );
    }

    addProductOrder(new_product: ProductOrder) {
        const existingProductOrder = this.cart.find((item) => {
            return (
                item.product.name === new_product.product.name &&
                this.areSetsEqual(item.contornos, new_product.contornos)
            );
        });

        if (existingProductOrder) {
            // Si el producto ya existe, incrementar su cantidad
            existingProductOrder.addProduct(new_product.amount);
        } else {
            // Si el producto no existe, agregarlo al carrito
            this.cart.push(new_product);
        }
    }

    addSecondaryProductToOrder(new_secondary_product: Product) {
        let new_product_order = new ProductOrder(new_secondary_product);

        const existingProductOrderIndex = this.cart.findIndex(
            (item) => item.product.name === new_product_order.product.name
        );

        if (existingProductOrderIndex !== -1) {
            // Si el producto ya existe, eliminarlo, ya que solo puede haber un solo secondary product por orden pero con diferentes cantidades
            this.cart.splice(existingProductOrderIndex, 1);
        } else {
            // Si el producto no existe, agregarlo al carrito
            this.cart.push(new_product_order);
        }
    }

    deleteProduct(product_index: number) {
        this.cart.splice(product_index, 1);
    }

    getSecondaryProducts(product_type: Product["type"]) {
        return this.secondary_products.filter(
            (product) => product.type === product_type
        );
    }

    editProductOrder(modified_product: ProductOrder) {
        this.cart[this.product_editing_index] = modified_product;
    }

    checkSecondaryProductSelected(secondary_product: Product) {
        return this.cart.some(
            (element) => element.product.name === secondary_product.name
        );
    }

    setMessageOrder() {
        let pedido_ordenado = "";

        this.getCart().forEach((product) => {
            pedido_ordenado += `* ${product.product_name} ${
                product.product_type === "Plato" ? "con" : ""
            } ${product.describirContornos()} x ${product.amount} — $${
                product.sub_total
            } \n`;
        });

        return `Hola, buenas tardes. Quiero hacer este pedido:\n\n${pedido_ordenado} \n\nCantidad total de productos: ${this.totalProducts}\nMonto total: $${this.total}`;
    }

    getCart() {
        const order = ["Plato", "Bebida", "Extra", "Delivery"];

        // Recorres los tipos y buscas sus coincidencias en el carrito
        return order.flatMap((type) =>
            this.cart.filter((p) => p.product_type === type)
        );

        // return this.cart.sort((a) => {
        //     if (a.product_type === "Plato") return -1;
        //     else return 1;
        // });

        //Esta implementacion genera bug de reordenamiento en el modal order, genera un bucle infinito en la reactividad
    }

    areSetsEqual<T>(setA: Set<T>, setB: Set<T>): boolean {
        // 1. Verificar si tienen el mismo tamaño
        if (setA.size !== setB.size) {
            return false;
        }

        // 2. Iterar sobre un conjunto y verificar la presencia de cada elemento en el otro
        for (const item of setA) {
            if (!setB.has(item)) {
                return false;
            }
        }

        // 3. Si se superan ambas verificaciones, los conjuntos son iguales
        return true;
    }

    modalStateChange(modal_state: Modal) {
        this.modal_on = modal_state;
    }

    selectProduct(product: ProductOrder) {
        this.product_selected = product;
    }

    onOpenModal(
        modal_state: Modal,
        product: Product | undefined,
        product_order: ProductOrder | undefined,
        product_editing_index: number | undefined
    ) {
        // console.log(
        //     "params",
        //     modal_state,
        //     product,
        //     product_order,
        //     product_editing_index
        // );

        if (modal_state === "SELECTED_PRODUCT" && product) {
            this.selectProduct(new ProductOrder(product));
            this.modalStateChange("SELECTED_PRODUCT");
            return;
        }

        if (
            modal_state === "SELECTED_PRODUCT_EDITING" &&
            product_order &&
            product_editing_index !== undefined
        ) {
            // console.log(
            //     "entra en el if selected",
            //     modal_state,
            //     product_order,
            //     product_editing_index
            // );
            this.selectProduct(product_order);
            this.modalStateChange("SELECTED_PRODUCT_EDITING");
            this.product_editing_index = product_editing_index;
            return;
        }

        // console.log("continua aqui");
        this.modalStateChange(modal_state);

        useHead({
            bodyAttrs: {
                style: { overflow: "hidden" },
            },
        });
    }

    onCloseModal() {
        if (this.modal_on === "SELECTED_PRODUCT_EDITING") {
            this.modalStateChange("ORDER_MODAL");
            return;
        }

        this.modalStateChange(null);
        useHead({
            bodyAttrs: {
                style: { overflow: "auto" },
            },
        });
    }
}

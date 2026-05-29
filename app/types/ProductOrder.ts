import type { Product } from "./Product";

export class ProductOrder {
    public product: Product;
    public contornos: Set<string>;
    public amount: number;
    public limit_contornos: number = 0;
    public product_without_contornos: string[] = [
        "Pasta a la bologna",
        "Hallaca con ensalada",
        "Plato navideño con asado negro",
        "Plato navideño con filet de cochino",
    ];

    constructor(
        product: Product = { name: "", price: 0, type: "Otro" },
        amount: number = 1,
        contornos: string[] = []
    ) {
        this.product = product;
        this.contornos = new Set(contornos);
        this.amount = amount;
    }

    get sub_total(): number {
        return this.product.price * this.amount;
    }

    get is_product_without_contorno(): boolean {
        return this.product_without_contornos.includes(this.product.name);
    }

    get can_add_order(): boolean {
        return this.contornos.size !== 0 || this.is_product_without_contorno;
    }

    get product_type(): Product["type"] {
        return this.product.type;
    }

    get product_name(): Product["name"] {
        return this.product.name;
    }

    addContorno(contorno: string) {
        if (this.contornos.has(contorno)) this.contornos.delete(contorno);
        else this.contornos.add(contorno);
    }

    removeContorno(contorno: string) {
        this.contornos.delete(contorno);
    }

    describirContornos() {
        return Array.from(this.contornos).join(", ");
    }

    addProduct(sum_amount: number = 1) {
        this.amount = this.amount + sum_amount;
    }

    removeProduct() {
        if (this.amount === 1) return;
        else {
            this.amount--;
        }
    }
}

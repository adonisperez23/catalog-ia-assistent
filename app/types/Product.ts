export type Product = {
    name: string;
    price: number;
    type: "Plato"|"Contorno" | "Bebida" | "Extra" | "Delivery" | "Otro";
    img_url?: string;
    img_avif_url?: string;
};

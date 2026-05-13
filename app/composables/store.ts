import { StoreManager } from "~/types/store_manager";

export const useStore = () =>
    useState<StoreManager>(
        "store",
        () =>
            new StoreManager(
                [
                    {
                        name: "Pollo guisado",
                        price: 6.99,
                        type: "Plato",
                        img_url:
                            "https://rlcms-fotos-producto.s3.sa-east-1.amazonaws.com/fotos-productos/Pollo_guisadoweb.jpg",
                        img_avif_url:
                            "https://rlcms-fotos-producto.s3.sa-east-1.amazonaws.com/fotos-productos/Pollo_guisadoweb.avif",
                    },
                    {
                        name: "Pollo a la plancha",
                        price: 6.99,
                        type: "Plato",
                        img_url:
                            "https://rlcms-fotos-producto.s3.sa-east-1.amazonaws.com/fotos-productos/polloalaplanchaweb.jpg",
                        img_avif_url:
                            "https://rlcms-fotos-producto.s3.sa-east-1.amazonaws.com/fotos-productos/polloalaplanchaweb.avif",
                    },
                    {
                        name: "Pescado frito",
                        price: 7.99,
                        type: "Plato",
                        img_url:
                            "https://rlcms-fotos-producto.s3.sa-east-1.amazonaws.com/fotos-productos/pescadocoginua.jpg",
                        img_avif_url:
                            "https://rlcms-fotos-producto.s3.sa-east-1.amazonaws.com/fotos-productos/pescadocoginua.avif",
                    },
                    {
                        name: "Lomito con pimenton",
                        price: 12.99,
                        type: "Plato",
                        img_url:
                            "https://rlcms-fotos-producto.s3.sa-east-1.amazonaws.com/fotos-productos/lomito-min1.jpg",
                        img_avif_url:
                            "https://rlcms-fotos-producto.s3.sa-east-1.amazonaws.com/fotos-productos/lomito1.avif",
                    },
                    // {
                    //     name: "Plato navideño con asado negro",
                    //     price: 11.99,
                    //     type: "Plato",
                    //     img_url:
                    //         "https://rlcms-fotos-producto.s3.sa-east-1.amazonaws.com/fotos-productos/asadonavidad-min.jpg",
                    //     img_avif_url:
                    //         "https://rlcms-fotos-producto.s3.sa-east-1.amazonaws.com/fotos-productos/asadonavidad.avif",
                    // },
                    // {
                    //     name: "Plato navideño con filet de cochino",
                    //     price: 13.99,
                    //     type: "Plato",
                    //     img_url:
                    //         "https://rlcms-fotos-producto.s3.sa-east-1.amazonaws.com/fotos-productos/navidadcochino-min.jpg",
                    //     img_avif_url:
                    //         "https://rlcms-fotos-producto.s3.sa-east-1.amazonaws.com/fotos-productos/navidadcochino.avif",
                    // },
                    // {
                    //     name: "Costillas de cochino fritas",
                    //     price: 11.99,
                    //     type: "Plato",
                    //     img_url:
                    //         "https://voley-storage.nyc3.cdn.digitaloceanspaces.com/food/min/3_costillas%20de%20cochino%20fritas-min.png",
                    //     img_avif_url:
                    //         "https://voley-storage.nyc3.cdn.digitaloceanspaces.com/food/avif/3_costillas%20de%20cochino%20fritas.avif",
                    // },

                    {
                        name: "Asado negro",
                        price: 9.99,
                        type: "Plato",
                        img_url:
                            "https://rlcms-fotos-producto.s3.sa-east-1.amazonaws.com/fotos-productos/asado-min.jpg",
                        img_avif_url:
                            "https://rlcms-fotos-producto.s3.sa-east-1.amazonaws.com/fotos-productos/asado.avif",
                    },

                    {
                        name: "Lengua en salsa",
                        price: 9.99,
                        type: "Plato",
                        img_url:
                            "https://rlcms-fotos-producto.s3.sa-east-1.amazonaws.com/fotos-productos/lenguaensalsaweb.jpg",
                        img_avif_url:
                            "https://rlcms-fotos-producto.s3.sa-east-1.amazonaws.com/fotos-productos/lenguaensalsaweb.avif",
                    },
                    {
                        name: "Costillas guisadas",
                        price: 9.99,
                        type: "Plato",
                        img_url:
                            "https://rlcms-fotos-producto.s3.sa-east-1.amazonaws.com/fotos-productos/costillasguisadasweb.jpg",
                        img_avif_url:
                            "https://rlcms-fotos-producto.s3.sa-east-1.amazonaws.com/fotos-productos/costillasguisadasweb.avif",
                    },

                    // {
                    //     name: "Callos madrileños",
                    //     price: 12.99,
                    //     type: "Plato",
                    //     img_url:
                    //         "https://rlcms-fotos-producto.s3.sa-east-1.amazonaws.com/fotos-productos/callos-min1.jpg",
                    //     img_avif_url:
                    //         "https://rlcms-fotos-producto.s3.sa-east-1.amazonaws.com/fotos-productos/callos1.avif",
                    // },
                    {
                        name: "Bistec de solomo",
                        price: 9.99,
                        type: "Plato",
                        img_url:
                            "https://rlcms-fotos-producto.s3.sa-east-1.amazonaws.com/fotos-productos/solomo-min.jpg",
                        img_avif_url:
                            "https://rlcms-fotos-producto.s3.sa-east-1.amazonaws.com/fotos-productos/solomo.avif",
                    },
                    {
                        name: "Filet de cochino",
                        price: 9.99,
                        type: "Plato",
                        img_url:
                            "https://rlcms-fotos-producto.s3.sa-east-1.amazonaws.com/fotos-productos/filetcochino1-min.jpg",
                        img_avif_url:
                            "https://rlcms-fotos-producto.s3.sa-east-1.amazonaws.com/fotos-productos/filetcochino1.avif",
                    },
                    {
                        name: "Bistec de higado encebollado",
                        price: 9.99,
                        type: "Plato",
                        img_url:
                            "https://rlcms-fotos-producto.s3.sa-east-1.amazonaws.com/fotos-productos/higado-min1.jpg",
                        img_avif_url:
                            "https://rlcms-fotos-producto.s3.sa-east-1.amazonaws.com/fotos-productos/higado1.avif",
                    },
                    // {
                    //     name: "Rabo en salsa",
                    //     price: 8.99,
                    //     type: "Plato",
                    //     img_url:
                    //         "https://voley-storage.nyc3.cdn.digitaloceanspaces.com/food/min/10_rabo%20en%20salsa-min.png",
                    //     img_avif_url:
                    //         "https://voley-storage.nyc3.cdn.digitaloceanspaces.com/food/avif/10_rabo%20en%20salsa.avif",
                    // },
                    {
                        name: "Pabellon criollo",
                        price: 7.99,
                        type: "Plato",
                        img_url:
                            "https://rlcms-fotos-producto.s3.sa-east-1.amazonaws.com/fotos-productos/pabellonweb.jpg",
                        img_avif_url:
                            "https://rlcms-fotos-producto.s3.sa-east-1.amazonaws.com/fotos-productos/pabellonweb.avif",
                    },
                    {
                        name: "Milanesa de pollo",
                        price: 9.99,
                        type: "Plato",
                        img_url:
                            "https://rlcms-fotos-producto.s3.sa-east-1.amazonaws.com/fotos-productos/milanesa-min.jpg",
                        img_avif_url:
                            "https://rlcms-fotos-producto.s3.sa-east-1.amazonaws.com/fotos-productos/milanesa.avif",
                    },
                    // {
                    //     name: "Hallaca con ensalada",
                    //     price: 6.99,
                    //     type: "Plato",
                    //     img_url:
                    //         "https://rlcms-fotos-producto.s3.sa-east-1.amazonaws.com/fotos-productos/hallacaensalada-min.jpg",
                    //     img_avif_url:
                    //         "https://rlcms-fotos-producto.s3.sa-east-1.amazonaws.com/fotos-productos/hallacaensalada.avif",
                    // },
                    {
                        name: "Filet de pollo",
                        price: 9.99,
                        type: "Plato",
                        img_url:
                            "https://rlcms-fotos-producto.s3.sa-east-1.amazonaws.com/fotos-productos/filetpollo-min.jpg",
                        img_avif_url:
                            "https://rlcms-fotos-producto.s3.sa-east-1.amazonaws.com/fotos-productos/filetpollo.avif",
                    },
                    {
                        name: "Pasta a la bologna",
                        price: 6.99,
                        type: "Plato",
                        img_url:
                            "https://rlcms-fotos-producto.s3.sa-east-1.amazonaws.com/fotos-productos/bologna-min.jpg",
                        img_avif_url:
                            "https://rlcms-fotos-producto.s3.sa-east-1.amazonaws.com/fotos-productos/bologna.avif",
                    },
                ],
                [
                    { name: "Arroz", price: 0, type: "Contorno" },
                    { name: "Pasta", price: 0, type: "Contorno" },
                    { name: "Arepas asadas", price: 0, type: "Contorno" },
                    { name: "Ensalada cocida", price: 0, type: "Contorno" },
                    { name: "Ensalada verde", price: 0, type: "Contorno" },
                    { name: "Pure de papa", price: 0, type: "Contorno" },
                    { name: "Papas al vapor", price: 0, type: "Contorno" },
                    { name: "Papa frita", price: 0, type: "Contorno" },
                    { name: "Tajadas fritas", price: 0, type: "Contorno" },
                    { name: "Caraotas negras", price: 0, type: "Contorno" },
                    { name: "frijoles", price: 0, type: "Contorno" },
                    { name: "Agua mineral 355ml", price: 1, type: "Bebida" },
                    { name: "Jugo de parchita", price: 2, type: "Bebida" },
                    { name: "Jugo de guayaba", price: 2, type: "Bebida" },
                    { name: "Jugo de lechoza", price: 2, type: "Bebida" },
                    { name: "Jugo de fresa", price: 3, type: "Bebida" },
                    { name: "Racion de papas fritas", price: 3, type: "Extra" },
                    { name: "Sector Centro", price: 2, type: "Delivery" },
                    { name: "Sector Tipuro", price: 3, type: "Delivery" },
                    { name: "Zona industrial", price: 3, type: "Delivery" },
                    { name: "Sector Juanico", price: 2, type: "Delivery" },
                    {
                        name: "Sector Alto los godos",
                        price: 2,
                        type: "Delivery",
                    },
                ],
            ),
    );

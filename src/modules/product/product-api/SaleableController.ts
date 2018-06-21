export interface SaleableController {
    getProductById(saleableId: string): Saleable
    addProduct(saleable: Saleable): Saleable
    updateProduct(saleable: Saleable): Saleable
    getAllProducts(): Saleable[]
}
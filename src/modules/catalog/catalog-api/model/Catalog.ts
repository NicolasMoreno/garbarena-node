import {SaleableAmount} from "./SaleableAmount";

export interface Catalog {
    products: SaleableAmount[]

    getProduct(productId: string): SaleableAmount
    sortCatalogByRangePrice(min: number, max: number): SaleableAmount[]
}
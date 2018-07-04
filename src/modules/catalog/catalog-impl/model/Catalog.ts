import {Catalog as CatalogAPI} from "../../catalog-api/model/Catalog";
import {SaleableAmount} from "../../catalog-api/model/SaleableAmount";

export class Catalog implements CatalogAPI {
    products: SaleableAmount[];

    constructor( saleables: SaleableAmount[]) {
        this.products = saleables;
    }

    getProduct(productId: string): SaleableAmount {
        return undefined;
    }

    sortCatalogByRangePrice(min: number, max: number): SaleableAmount[] {
        return this.products.filter(product => (product.product.price > min && product.product.price < max));
    }

}
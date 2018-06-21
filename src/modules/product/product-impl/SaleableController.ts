import {SaleableController as SaleableControllerAPI} from "../product-api/SaleableController";
import {SaleableRepository} from "./repository/SaleableRepository";

export class SaleableController implements SaleableControllerAPI {

    private SaleableRepository: SaleableRepository;

    addProduct(saleable: Saleable): Saleable {
        return undefined;
    }

    getAllProducts(): Saleable[] {
        return undefined;
    }

    getProductById(saleableId: string): Saleable {
        return undefined;
    }

    updateProduct(saleable: Saleable): Saleable {
        return undefined;
    }

}
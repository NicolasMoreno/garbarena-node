
export class StorageRepository {
    private static _instance: StorageRepository = new StorageRepository();

    constructor() {
        if(!StorageRepository._instance) {
            StorageRepository._instance = this
        }
    }

    public static getInstance(): StorageRepository {
        return this._instance;
    }


}

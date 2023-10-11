import {IBrand} from "./brand.model";
import {ICategory} from "./category.model";

export interface IDevice {
    id: number;
    name: string;
    description: string;
    price: number;
    sale: number | null;
    availability: number;
    brandId: number;
    brand: IBrand | undefined;
    categories: ICategory[]
    image_url: string | null;
}

export interface IDeviceCreationDto {
    name: string;
    price: number;
    sale: number | null;
    availability: number;
    brandId: number;
    categoryId: number;
    image_url: string | null;
}

export interface ICategory {
    id: number;
    name: string;
    parentCategoryId: number | null;
    parentCategory: ICategory | undefined;
    innerCategories: ICategory[];
}

export interface ICategoryCreationDto {
    name: string;
    parentCategoryId: number | null;
}

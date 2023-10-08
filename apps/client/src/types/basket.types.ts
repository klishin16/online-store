import { IPurchase } from "@/models";

export interface IBasketState {
    isLoading: boolean;
    purchases: IPurchase[] | null;
}
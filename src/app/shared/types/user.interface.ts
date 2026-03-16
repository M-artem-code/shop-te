import { IOrder } from "./order.interface";
import { IProduct } from "./product.interface";
import { IStore } from "./store.inteface";

export interface IUser {
    id: string;
    name: string;
    email: string;
    picture: string;
    favorites: IProduct[];
    orders: IOrder[];
    stores: IStore[];
}


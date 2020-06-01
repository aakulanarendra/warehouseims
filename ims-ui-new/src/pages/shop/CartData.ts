export interface CartData {
    isLoading?: boolean;
    items: CartItem[];


    onAllItemsDeleted: () => void;
    onItemAdded: (id: string) => void;
    onItemDeleted: (id: string) => void;
}

export interface CartItem {
    id: string;
    name: string;
    image?: string;
    link?: string;
    quantity: number;
    price: number;
    maxCount?: number
}
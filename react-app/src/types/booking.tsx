export interface CartBookingItem {
    id: string;
    name: string;
    venue: string;
    category: string;
    quantity: number;
    price: number;
    session: {
        date: string;
        time: string;
    }
}
export interface CartBookingItem {
    id: string;
    category: string;
    quantity: number;
    session: {
        date: string;
        time: string;
    }
}
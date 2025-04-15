export interface CartBookingItem {
    id: string;
    name: string;
    venue: string;
    category: string;
    quantity: number;
    session: {
        date: string;
        time: string;
    }
}
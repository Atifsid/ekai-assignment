export interface Chat {
    category: string | null;
    title: string | null;
    messages: Message[]
}

export interface Message {
    question: string;
    answer: string
}
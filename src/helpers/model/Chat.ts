import { UniqueIdentifier } from "@dnd-kit/core";

export interface Chat {
    id: UniqueIdentifier;
    title: string | null;
    messages: Message[]
}

export interface Message {
    question: string;
    answer: string
}
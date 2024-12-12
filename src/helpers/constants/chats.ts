import { Chat } from "../model/Chat";

export const chats: Chat[] = [
    {
        category: "Programming",
        title: "React Basics",
        messages: [
            {
                question: "What is React?",
                answer: "React is a JavaScript library for building user interfaces."
            },
            {
                question: "How do I create a component in React?",
                answer: "You can create a component by defining a function or class that returns JSX."
            }
        ]
    },
    {
        category: "Programming",
        title: "JavaScript Fundamentals",
        messages: [
            {
                question: "What are JavaScript variables?",
                answer: "Variables are used to store data in JavaScript."
            },
            {
                question: "What is the difference between `var`, `let`, and `const`?",
                answer: "`var` is function-scoped, while `let` and `const` are block-scoped. `const` is used for values that should not be reassigned."
            }
        ]
    },
    {
        category: "Lifestyle",
        title: "Healthy Living",
        messages: [
            {
                question: "What are some tips for eating healthy?",
                answer: "Eat a balanced diet with plenty of fruits and vegetables."
            },
            {
                question: "How important is regular exercise?",
                answer: "Regular exercise is crucial for maintaining physical and mental health."
            }
        ]
    },
    {
        category: "Philosophy",
        title: "Random Thoughts",
        messages: [
            {
                question: "What is the meaning of life?",
                answer: "The meaning of life is subjective and varies for each individual."
            },
            {
                question: "Why is the sky blue?",
                answer: "The sky appears blue because of the scattering of sunlight by the atmosphere."
            }
        ]
    },
    {
        category: "Entertainment",
        title: "Movies Discussion",
        messages: [
            {
                question: "What are your favorite movies?",
                answer: "I enjoy sci-fi and fantasy genres."
            },
            {
                question: "Any recommendations for a good movie to watch?",
                answer: "You might enjoy 'Inception' or 'The Matrix' if you like thought-provoking sci-fi movies."
            }
        ]
    }
];
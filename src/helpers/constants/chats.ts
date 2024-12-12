export const CATEGORIES = {
    'Work': [
        {
            id: 'chat-1',
            category: 'Work',
            title: 'Project Updates',
            messages: [
                { question: 'How are we doing on the new project?', answer: 'The project is on schedule and 75% complete.' },
                { question: 'Do we need more resources?', answer: 'Yes, we might need an additional developer for the last phase.' },
            ]
        },
        {
            id: 'chat-2',
            category: 'Work',
            title: 'Team Meeting Recap',
            messages: [
                { question: 'What was discussed in today\'s meeting?', answer: 'We went over the quarterly goals and client deliverables.' },
                { question: 'Who will be handling the marketing?', answer: 'Sarah will be managing the marketing campaign starting next month.' },
            ]
        }
    ],
    'Social': [
        {
            id: 'chat-3',
            category: 'Social',
            title: 'Weekend Plans',
            messages: [
                { question: 'Any plans for the weekend?', answer: 'Thinking of going hiking, anyone interested?' },
                { question: 'How about a movie night?', answer: 'Sounds good! What movie are we watching?' },
            ]
        },
        {
            id: 'chat-4',
            category: 'Social',
            title: 'Book Club Discussion',
            messages: [
                { question: 'What did everyone think of the last book?', answer: 'I loved it, especially the character development.' },
                { question: 'What book are we reading next?', answer: 'We decided on "The Silent Patient" for next month.' },
            ]
        }
    ],
    'Support': [
        {
            id: 'chat-5',
            category: 'Support',
            title: 'Technical Issue - Login Problem',
            messages: [
                { question: 'I can\'t log in to my account, what should I do?', answer: 'Please try resetting your password using the "Forgot Password" option.' },
                { question: 'I still can\'t log in, is there an issue?', answer: 'Let me check, there might be a server outage. I\'ll get back to you in a moment.' },
            ]
        },
        {
            id: 'chat-6',
            category: 'Support',
            title: 'Billing Query',
            messages: [
                { question: 'Why was I charged twice for this month?', answer: 'Let me check your account, I will resolve this issue immediately.' },
                { question: 'Will I receive a refund for the duplicate charge?', answer: 'Yes, a refund will be processed within 3 business days.' },
            ]
        }
    ],
    'Random': [
        {
            id: 'chat-7',
            category: 'Random',
            title: 'New Music Recommendations',
            messages: [
                { question: 'Any good music recommendations?', answer: 'Check out the new album by The Weeknd, it\'s really good!' },
                { question: 'What genre are you into these days?', answer: 'I\'ve been into a lot of lo-fi hip hop and indie rock lately.' },
            ]
        },
        {
            id: 'chat-8',
            category: 'Random',
            title: 'Funny Memes',
            messages: [
                { question: 'Saw any good memes lately?', answer: 'Here, check out this hilarious one I found!' },
                { question: 'LOL, that\'s great! Where do you find these?', answer: 'I follow a few meme pages on Instagram.' },
            ]
        }
    ]
}

export const categoryColors: { [key: string]: string } = {
    "Work": "bg-slate-700",
    "Social": "bg-amber-800",
    "Support": "bg-purple-700",
    "Random": "bg-indigo-700",
};
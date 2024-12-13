export const CATEGORIES = {
    'Work': [
        {
            id: 'work-chat-0',
            title: 'Project Updates',
            messages: [
                { question: 'How are we doing on the new project?', answer: 'The project is on schedule and 75% complete.' },
                { question: 'Do we need more resources?', answer: 'Yes, we might need an additional developer for the last phase.' },
            ]
        },
        {
            id: 'work-chat-1',
            title: 'Team Meeting Recap',
            messages: [
                { question: 'What was discussed in today\'s meeting?', answer: 'We went over the quarterly goals and client deliverables.' },
                { question: 'Who will be handling the marketing?', answer: 'Sarah will be managing the marketing campaign starting next month.' },
            ]
        }
    ],
    'Social': [
        {
            id: 'social-chat-0',
            title: 'Weekend Plans',
            messages: [
                { question: 'Any plans for the weekend?', answer: 'Thinking of going hiking, anyone interested?' },
                { question: 'How about a movie night?', answer: 'Sounds good! What movie are we watching?' },
            ]
        },
        {
            id: 'social-chat-1',
            title: 'Book Club Discussion',
            messages: [
                { question: 'What did everyone think of the last book?', answer: 'I loved it, especially the character development.' },
                { question: 'What book are we reading next?', answer: 'We decided on "The Silent Patient" for next month.' },
            ]
        }
    ],
    'Support': [
        {
            id: 'support-chat-0',
            title: 'Technical Issue - Login Problem',
            messages: [
                { question: 'I can\'t log in to my account, what should I do?', answer: 'Please try resetting your password using the "Forgot Password" option.' },
                { question: 'I still can\'t log in, is there an issue?', answer: 'Let me check, there might be a server outage. I\'ll get back to you in a moment.' },
            ]
        },
        {
            id: 'support-chat-1',
            title: 'Billing Query',
            messages: [
                { question: 'Why was I charged twice for this month?', answer: 'Let me check your account, I will resolve this issue immediately.' },
                { question: 'Will I receive a refund for the duplicate charge?', answer: 'Yes, a refund will be processed within 3 business days.' },
            ]
        }
    ],
    'Random': [
        {
            id: 'random-chat-0',
            title: 'New Music Recommendations',
            messages: [
                { question: 'Any good music recommendations?', answer: 'Check out the new album by The Weeknd, it\'s really good!' },
                { question: 'What genre are you into these days?', answer: 'I\'ve been into a lot of lo-fi hip hop and indie rock lately.' },
            ]
        },
        {
            id: 'random-chat-1',
            title: 'Funny Memes',
            messages: [
                { question: 'Saw any good memes lately?', answer: 'Here, check out this hilarious one I found!' },
                { question: 'LOL, that\'s great! Where do you find these?', answer: 'I follow a few meme pages on Instagram.' },
            ]
        }
    ]
}

export const CATEGORY_BG_COLORS: { [key: string]: string } = {
    "Work": "bg-slate-700",
    "Social": "bg-rose-700",  // Similar to slate, but warmer
    "Support": "bg-teal-700",  // Deep teal for a more professional look
    "Random": "bg-indigo-800", // Slightly darker for a rich tone
};

export const CATEGORY_FONT_COLORS: { [key: string]: string } = {
    "Work": "text-gray-200",
    "Social": "text-gray-100",  // Soft, but maintains contrast
    "Support": "text-gray-100", // Consistent readability
    "Random": "text-gray-100",  // Light gray for better readability
};

export const CATEGORY_ACCENT_COLORS: { [key: string]: string } = {
    "Work": "bg-blue-400",
    "Social": "bg-orange-400", // Warm accent to complement the base color
    "Support": "bg-cyan-400",  // A brighter teal for contrast
    "Random": "bg-purple-400", // A purple accent to go with dark indigo
}
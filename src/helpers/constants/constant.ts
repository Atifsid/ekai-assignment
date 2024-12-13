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
                { question: 'What are the quarterly goals?', answer: 'Our goals include increasing client retention by 15%, improving lead generation, and launching a new product feature.' },
                { question: 'What is the timeline for the new product feature?', answer: 'The new product feature will be launched by the end of Q2.' },
                { question: 'What about the client deliverables?', answer: 'The client deliverables need to be completed by the end of this month.' },
                { question: 'Is there a new deadline for the sales team?', answer: 'Yes, the sales team has a new deadline to submit their reports by the 15th of next month.' },
                { question: 'Who is in charge of the client reports?', answer: 'John will be handling the client reports for this quarter.' },
                { question: 'What did we decide about the team collaboration tool?', answer: 'We decided to switch to Slack for internal communication and Trello for project management.' },
                { question: 'Is there a budget for team events?', answer: 'Yes, we have a budget of $2,000 for the next team-building event.' },
                { question: 'When will the next team-building event be held?', answer: 'The next event will be held in the first week of next month.' },
                { question: 'Are there any upcoming training sessions?', answer: 'Yes, there will be a leadership training session next Wednesday.' },
                { question: 'Who is attending the training session?', answer: 'Tom, Lisa, and Rachel will be attending the leadership training.' },
                { question: 'What about the customer feedback review?', answer: 'The customer feedback review will be conducted by Emma next Monday.' },
                { question: 'When is the next department meeting?', answer: 'The next department meeting is scheduled for next Thursday at 10 AM.' },
                { question: 'Are we hiring anyone this quarter?', answer: 'Yes, we are looking to hire a new software developer by the end of the quarter.' },
                { question: 'What’s the update on the website redesign?', answer: 'The website redesign is on track, with a planned launch date of May 15th.' },
                { question: 'Who is responsible for the website redesign?', answer: 'Alice is leading the website redesign project.' },
                { question: 'Is the marketing campaign ready to launch?', answer: 'Yes, the marketing campaign is ready to go live next Monday.' },
                { question: 'What are the new marketing objectives?', answer: 'The new marketing objectives are to increase brand awareness and drive more traffic to the website.' },
                { question: 'What about the upcoming product launch?', answer: 'The upcoming product launch will happen in June, and we are finalizing the promotional strategy.' }
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
    "Work": "#2D3748",
    "Social": "#BE185D",
    "Support": "#14B8A6",
    "Random": "#4338CA",
};

export const CATEGORY_FONT_COLORS: { [key: string]: string } = {
    "Work": "#E5E7EB",
    "Social": "#F5F6F7",
    "Support": "#F5F6F7",
    "Random": "#F5F6F7",
};

export const CATEGORY_ACCENT_COLORS: { [key: string]: string } = {
    "Work": "#60A5FA",
    "Social": "#FB923C",
    "Support": "#22D3EE",
    "Random": "#A78BFA",
}
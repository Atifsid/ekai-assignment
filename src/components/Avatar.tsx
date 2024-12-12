import React from 'react';

export const Avatar = () => {
    return (
        <div className="hidden md:block absolute top-4 right-4">
            <img
                src="https://picsum.photos/200"
                alt="Avatar"
                className="w-10 h-10 rounded-full border border-primary shadow-lg"
            />
        </div>
    );
};

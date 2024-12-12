import React from 'react';

const Loading = () => {
    return (
        <div className="flex justify-center items-center h-screen">
            <div className="animate-spin w-16 h-16 border-4 border-t-transparent border-primary rounded-full"></div>
        </div>
    );
};

export default Loading;

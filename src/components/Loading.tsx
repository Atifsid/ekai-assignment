import React from 'react';

const Loading = () => {
    return (
        <div className="flex justify-center items-center h-screen flex-col">
            <div className="animate-spin w-16 h-16 border-4 border-t-transparent border-white rounded-full"></div>
            <p className="mt-5 text-white text-xl animate-pulse">Please wait...</p>
        </div>
    );
};

export default Loading;

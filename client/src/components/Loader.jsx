import React from 'react';

const Loader = ({ size = 'medium', text = 'Loading...', fullScreen = false }) => {
    const sizeClasses = {
        small: 'w-8 h-8',
        medium: 'w-12 h-12',
        large: 'w-16 h-16'
    };

    const textSizeClasses = {
        small: 'text-sm',
        medium: 'text-base',
        large: 'text-lg'
    };

    // Extracting the spinner to keep the code DRY (Don't Repeat Yourself)
    const SpinnerIndicator = () => (
        <div 
            className={`animate-spin rounded-full border-4 border-gray-100 border-t-purple-600 ${sizeClasses[size]}`}
        ></div>
    );

    return (
        <div className="fixed inset-0 flex items-center justify-center z-[9999] min-h-screen">
            <div className="bg-white rounded-2xl p-8 flex flex-col items-center shadow-2xl min-w-[200px]">
                <SpinnerIndicator />
                {text && (
                    <p className={`mt-4 font-medium text-gray-600 text-center animate-pulse ${textSizeClasses[size]}`}>
                        {text}
                    </p>
                )}
            </div>
        </div>
    );
};

export default Loader;
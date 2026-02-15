import React from 'react';

const Card = ({ title, children, footer }) => {
    return (
        <div className="bg-white rounded-xl shadow-md overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
            {title && (
                <div className="px-6 py-6 border-b border-gray-200 bg-gradient-to-r from-gray-100 to-gray-200">
                    <h3 className="m-0 text-xl text-gray-800">{title}</h3>
                </div>
            )}
            <div className="p-6">
                {children}
            </div>
            {footer && (
                <div className="px-6 py-4 border-t border-gray-200 bg-gray-50">
                    {footer}
                </div>
            )}
        </div>
    );
};

export default Card;

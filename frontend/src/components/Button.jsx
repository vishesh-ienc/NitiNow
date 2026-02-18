import React from 'react';

const Button = ({
    children,
    onClick,
    variant = 'primary',
    size = 'medium',
    disabled = false
}) => {
    const baseClasses = "border-none rounded-lg font-semibold cursor-pointer transition-all duration-300 font-sans disabled:opacity-60 disabled:cursor-not-allowed";

    const variantClasses = {
        primary: "bg-gradient-to-r from-[#FF6B00] to-[#FF8C00] text-white hover:shadow-lg hover:from-[#e55f00] hover:to-[#e07a00]",
        secondary: "bg-[#003087] text-white hover:shadow-lg hover:bg-[#1a3a6b]",
        outline: "bg-transparent border-2 border-[#003087] text-[#003087] hover:bg-[#003087] hover:text-white hover:shadow-lg"
    };

    const sizeClasses = {
        small: "py-2 px-4 text-sm",
        medium: "py-3 px-6 text-base",
        large: "py-4 px-8 text-lg"
    };

    const hoverClasses = !disabled ? "hover:-translate-y-0.5 active:translate-y-0" : "";

    return (
        <button
            className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${hoverClasses}`}
            onClick={onClick}
            disabled={disabled}
        >
            {children}
        </button>
    );
};

export default Button;

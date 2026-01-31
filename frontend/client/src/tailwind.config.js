// tailwind.config.js
/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                // Grayscale palette as specified
                'primary-bg': '#FFFFFF',
                'secondary-bg': '#F5F5F5',
                'text-primary': '#000000',
                'text-secondary': '#333333',
                'accent': '#666666',
                'disabled': '#999999',
                'border': '#EEEEEE',
            },
            fontFamily: {
                'satoshi': ['Satoshi', 'sans-serif'],
                'inter': ['Inter', 'sans-serif'],
            },
            animation: {
                'fade-in': 'fadeIn 0.5s ease-in-out',
                'slide-up': 'slideUp 0.3s ease-out',
                'scale': 'scale 0.2s ease-in-out',
            },
            keyframes: {
                fadeIn: {
                    '0%': { opacity: '0' },
                    '100%': { opacity: '1' },
                },
                slideUp: {
                    '0%': { transform: 'translateY(10px)', opacity: '0' },
                    '100%': { transform: 'translateY(0)', opacity: '1' },
                },
                scale: {
                    '0%': { transform: 'scale(1)' },
                    '100%': { transform: 'scale(1.05)' },
                }
            }
        },
    },
    plugins: [],
}
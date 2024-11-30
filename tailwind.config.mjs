/** @type {import('tailwindcss').Config} */
export default {
    content: ['./src/**/*.{astro,html,md,mdx,ts,tsx}'],
    theme: {
        extend: {
            keyframes: {
                slide: {
                    '0%': { transform: 'translateX(-100%)' },
                    '100%': { transform: 'translateX(100%)' }
                },
                dropdown: {
                    '0%': { opacity: 0, transform: 'scale(0.95)' },
                    '100%': { opacity: 1, transform: 'scale(1)' }
                }
            },
            animation: {
                dropdown: 'dropdown 0.1s ease-out'
            },
            fontFamily: {
                montserrat: ['Montserrat', 'sans-serif']
            }
        }
    },
    plugins: [require('@tailwindcss/typography')]
};

/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./pages/**/*.{js,ts,jsx,tsx}",
        "./components/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {},
    },
    plugins: [require("daisyui")],

    daisyui: {
        themes: [
            {
                tfc: {
                    "color-scheme": "light",
                    "--tw-text-opacity": 1,

                    "--rounded-box": "0rem",
                    "--rounded-btn": "0rem",
                    "--rounded-badge": "0rem",
                },
            },
        ],
    },
};

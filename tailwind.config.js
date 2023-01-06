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
                    ...require("daisyui/src/colors/themes")[
                        "[data-theme=dracula]"
                    ],
                    "--rounded-box": "0.25rem",
                    "--rounded-btn": "0.125rem",
                    "--rounded-badge": "0.125rem",
                    "--animation-btn": "0",
                    "--animation-input": "0",
                    "--btn-focus-scale": "1",
                    "--tab-radius": "0",
                },
            },
        ],
    },
};

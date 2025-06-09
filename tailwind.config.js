module.exports = {
    content: [
        './index.html',
        './src/**/*.{js,jsx,ts,tsx}',
    ],
    safelist: ['text-titleBlue'],
    theme: {
        extend: {
            fontFamily: {
                roboto: ['Roboto', 'sans-serif'],
            },
            colors: {
                titleBlue: '#075985',
                titleLightBlue: '#0284c7',
                bgBlue: '#f0f9ff',
            },
        },
    },
    plugins: [],
}

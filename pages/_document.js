import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
    return (
        <Html lang="en" data-theme="lofi">
            <Head>
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link
                    rel="preconnect"
                    href="https://fonts.gstatic.com"
                    crossorigin
                />
                <link
                    href="https://fonts.googleapis.com/css2?family=Inter:wght@100;200;300;400;500;600;700;800;900&display=swap"
                    rel="stylesheet"
                />

                <link
                    rel="stylesheet"
                    href="https://cdnjs.cloudflare.com/ajax/libs/KaTeX/0.5.1/katex.min.css"
                />
                <link
                    rel="stylesheet"
                    href="https://cdnjs.cloudflare.com/ajax/libs/github-markdown-css/5.1.0/github-markdown-light.css"
                    integrity="sha512-1d9gwwC3dNW3O+lGwY8zTQrh08a41Ejci46DdzY1aQbqi/7Qr8Asp4ycWPsoD52tKXKrgu8h/lSpig1aAkvlMw=="
                    crossorigin="anonymous"
                    referrerpolicy="no-referrer"
                />
            </Head>
            <body>
                <Main />
                <NextScript />
            </body>
        </Html>
    );
}

import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
    return (
        <Html lang="en" data-theme="tfc">
            <Head>
                <script
                    async
                    src="https://use.fontawesome.com/05f9009fe4.js"
                ></script>
                <script
                    async
                    src="https://kit.fontawesome.com/63a581d50e.js"
                    crossorigin="anonymous"
                ></script>
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
                <link
                    rel="stylesheet"
                    href="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.7.0/styles/default.min.css"
                />
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link
                    rel="preconnect"
                    href="https://fonts.gstatic.com"
                    crossorigin
                />
                <link
                    href="https://fonts.googleapis.com/css2?family=Inter:wght@100;200;300;400;500;600;700;800;900&display=swap"
                    rel="stylesheet"
                ></link>
                <script
                    async
                    src="https://cdn.tiny.cloud/1/q9tk00utsp1f1i00hu0y9dw0dr5g79mraetkwnas965hlzwe/tinymce/6/tinymce.min.js"
                    referrerpolicy="origin"
                ></script>
            </Head>
            <body className="bg-slate-50 min-h-screen">
                <Main />
                <NextScript />
            </body>
        </Html>
    );
}

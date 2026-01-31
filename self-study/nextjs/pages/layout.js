export default function RootLayout({children}) {
    return (
        <html>
            <body>
                <header>
                    <h1>hello nextjs</h1>
                </header>
                <main>{children}</main>
                Hello again.
            </body>
        </html>
    )
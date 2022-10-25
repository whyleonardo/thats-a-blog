import Document, { Html, Head, Main, NextScript } from 'next/document'

class MyDocument extends Document {
  render() {
    return (
      <Html lang='en'>
        <Head>
          <link
            rel="preconnect"
            href="https://fonts.googleapis.com"
          />

          <link
            rel="preconnect"
            href="https://fonts.gstatic.com"
            // @ts-ignore
            crossOrigin
          />

          <link
            href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;700&family=Roboto:ital,wght@0,100;0,400;0,700;0,900;1,100&display=swap" rel="stylesheet"
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html >
    )
  }
}

export default MyDocument
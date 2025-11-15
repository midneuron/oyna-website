import Document, { Html, Head, Main, NextScript, DocumentContext } from "next/document";

class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }

  render() {
    const lang = this.props.__NEXT_DATA__?.locale ?? "ru";
    return (
      <Html lang={lang}>
        <Head>
          <link rel="preconnect" href="https://fonts.cdnfonts.com" />
          <link rel="icon" type="image/png" href="/images/logo.png" />
          <link rel="shortcut icon" type="image/png" href="/images/logo.png" />
          <link rel="apple-touch-icon" href="/images/logo.png" />
        </Head>
        <body className="antialiased bg-ash text-night">
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;

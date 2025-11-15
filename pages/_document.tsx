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

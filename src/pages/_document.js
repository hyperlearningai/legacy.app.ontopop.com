import Document, {
  Html, Head, Main, NextScript
} from 'next/document'

// We can't use Content-Security-Policy in 'next dev' mode, as it breaks hot-reloading
// const disableCsp = process.env.NODE_ENV === 'development';
/* { !disableCsp ? <meta httpEquiv="Content-Security-Policy"
         content="block-all-mixed-content;default-src 'none';
         connect-src 'self';font-src fonts.googleapis.com;
        form-action 'self';img-src 'self' data:;manifest-src 'self';prefetch-src 'self';
      script-src 'self';style-src 'self';" /> : '' } */

class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head>
          <meta httpEquiv="x-ua-compatible" content="IE=Edge" />
          <meta httpEquiv="X-Content-Type-Options" content="nosniff" />
          <meta httpEquiv="Strict-Transport-Security" content="max-age=31536000" />
          <meta httpEquiv="Referrer-Policy" content="strict-origin-when-cross-origin" />
          <meta lang="en" />
          <link rel="shortcut icon" href="/images/logo.svg" />
        </Head>

        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument

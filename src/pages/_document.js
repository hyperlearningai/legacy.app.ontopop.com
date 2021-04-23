/* eslint react/no-danger:0 */
import Document, {
  Html, Head, Main, NextScript
} from 'next/document'
import {
  USERBACK_ACCESS_TOKEN,
  GA_ID
} from '../constants/analytics'

// We can't use Content-Security-Policy in 'next dev' mode, as it breaks hot-reloading
// const disableCsp = process.env.NODE_ENV === 'development';
/* { !disableCsp ? <meta httpEquiv="Content-Security-Policy"
         content="block-all-mixed-content;default-src 'none';
         connect-src 'self';font-src fonts.googleapis.com;
        form-action 'self';img-src 'self' data:;manifest-src 'self';prefetch-src 'self';
      script-src 'self';style-src 'self';" /> : '' } */

const userbackSnippet = `window.Userback = window.Userback || {};
  Userback.access_token = '${USERBACK_ACCESS_TOKEN}';
`

const mouseflowSnippet = `window._mfq = window._mfq || [];
  (function() {
    var mf = document.createElement("script");
    mf.type = "text/javascript"; mf.defer = true;
    mf.src = "//cdn.mouseflow.com/projects/17067ed4-6a87-41f9-b1f0-44249c9c1bfe.js";
    document.getElementsByTagName("head")[0].appendChild(mf);
  })();`

const googleAnalyticsSnippet = `
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
`

const gtagUrl = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`

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
          <link rel="shortcut icon" href="/images/logo.png" />
        </Head>

        <body>
          <Main />
          <NextScript />

          {
            process.env.NEXT_PUBLIC_ADD_FEEDBACK === 'true'
            && (
              <>
                <script async src={gtagUrl} />

                <script
                  dangerouslySetInnerHTML={{ __html: googleAnalyticsSnippet }}
                />

                <script
                  dangerouslySetInnerHTML={{ __html: userbackSnippet }}
                />
                <script
                  dangerouslySetInnerHTML={{ __html: mouseflowSnippet }}
                />
              </>
            )
          }
        </body>
      </Html>
    )
  }
}

export default MyDocument

import '../styles/tailwind.css';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import Script from 'next/script';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      {process.env.NODE_ENV === 'production' && (
        <>
          <Script
            strategy="afterInteractive"
            src="https://www.googletagmanager.com/gtag/js?id=G-P2S8H6ZWQR"
          ></Script>
          <Head>
            {/* Global site tag (gtag.js) - Google Analytics */}
            <script
              dangerouslySetInnerHTML={{
                __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());

              gtag('config', 'G-P2S8H6ZWQR');`,
              }}
            ></script>
          </Head>
        </>
      )}
      <Component {...pageProps} />
    </>
  );
}
export default MyApp;

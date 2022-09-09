import Head from 'next/head';
import { useRouter } from 'next/router';

const baseUrl = `https://profile-overflow.vercel.app`;
const twitterHandle = `@jackyef__`;

export const MetaTags = ({
  title = 'ProfileOverflow',
  description = 'Fun way to share some of your (already) public StackOverflow user data to the internet.',
  ogPath = 'og.png',
}) => {
  const router = useRouter();
  const url = `${baseUrl}${router.asPath}`;
  const keywords = '';
  // Update this as needed
  const ogImage = `${baseUrl}/${ogPath}`;

  /* orange-500 */
  const themeColor = '#f97316';

  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta property="og:url" content={url} />
      <meta property="og:type" content="website" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:keywords" content={keywords} />
      <meta property="og:image" content={ogImage} />

      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:site" content={url} />
      <meta property="twitter:creator" content={twitterHandle} />
      <meta property="twitter:title" content={title} />
      <meta property="twitter:description" content={description} />
      <meta property="twitter:image" content={ogImage} />
      <meta property="twitter:url" content={url} />

      <meta name="theme-color" content={themeColor} />

      <link
        rel="apple-touch-icon"
        sizes="180x180"
        href="/favicons/apple-touch-icon.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="32x32"
        href="/favicons/favicon-32x32.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="16x16"
        href="/favicons/favicon-16x16.png"
      />
      <link rel="manifest" href="/favicons/site.webmanifest" />
      <meta name="msapplication-TileColor" content={themeColor} />
      <meta name="theme-color" content={themeColor} />
    </Head>
  );
};

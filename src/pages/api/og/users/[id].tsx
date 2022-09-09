import chromium from 'chrome-aws-lambda';
import type { NextApiRequest, NextApiResponse } from 'next';

const isDev = !process.env.AWS_REGION;
const exePath =
  process.platform === 'win32'
    ? 'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe'
    : process.platform === 'linux'
    ? '/usr/bin/google-chrome'
    : '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';

async function getOptions(isDev: boolean) {
  let options;

  if (isDev) {
    options = {
      args: [],
      executablePath: exePath,
      headless: true,
    };
  } else {
    options = {
      args: chromium.args,
      executablePath: await chromium.executablePath,
      headless: chromium.headless,
      ignoreHTTPSErrors: true,
    };
  }
  return options;
}

export default async function opengraph(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  // Parse the title
  const { id } = req.query;
  const baseURL = isDev ? 'http://localhost:3000' : req.headers.host;

  //Fake the nodejs version
  console.error('req.headers.host', req.headers.host);
  console.error('isDev', isDev);
  console.error('process.env.AWS_REGION', process.env.AWS_REGION);
  console.error(
    '[original] process.env.AWS_EXECUTION_ENV',
    process.env.AWS_EXECUTION_ENV,
  );
  process.env.AWS_EXECUTION_ENV = 'AWS_Lambda_nodejs14.x';
  console.error(
    '[faked] process.env.AWS_EXECUTION_ENV',
    process.env.AWS_EXECUTION_ENV,
  );
  // Open the browser with the right window size
  const options = await getOptions(isDev);
  const browser = await chromium.puppeteer.launch(options);

  // Navigate a new browser page to the layout page
  let page = await browser.newPage();
  await page.setViewport({ width: 1200, height: 630 });
  await page.goto(`${baseURL}/users/${id}/og-image`, {
    waitUntil: 'networkidle2',
  });

  // Take a screenshot
  const screenshotBuffer = await page.screenshot({ type: 'png' });
  await browser.close();

  // Tell the consuming service to cache the image being sent
  res.setHeader(
    'Cache-Control',
    `public, immutable, no-transform, s-maxage=31536000, max-age=31536000`,
  );
  res.setHeader('Content-Type', 'image/png');
  res.status(200).send(screenshotBuffer);
}

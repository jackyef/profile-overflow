// ID of the StackApp, public, not secret
// If you're forking this project, create your own Stack App and
// replace the key here
// https://stackapps.com/apps/oauth/register
export const STACK_APP_CLIENT_ID = '24287';
// Key to be used when making request to StackExchange APIs, not secret.
// But we take them from ENV anyway because it's tied to our app's quota
export const STACK_APP_KEY = process.env.STACK_APP_KEY as string;

// Name for the cookie we are storing the access token in
// Access token are generated when the user log in with StackOverflow
export const STACK_APP_COOKIE_NAME = 'stackapp_access_token';

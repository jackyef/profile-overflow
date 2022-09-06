// ID of the StackApp, public, not secret
export const STACK_APP_CLIENT_ID = '24287';
// Key to be used when making request to StackExchange APIs, not secret.
// But we take them from ENV anyway because it's tied to our app's quota
export const STACK_APP_KEY = process.env.STACK_APP_KEY as string;

// An array of routes that are accessible to the public
// @type {string[]}
export const publicRoutes = ["/", "/auth/new-verification", ];

// An array of routes that are used for authentification.
// These will redirect logged in users to /settings
export const authRoutes = ["/auth/login", "/auth/register", "/auth/error"];

// The prefix for api auth routes
export const apiAuthPrefix = "/api/auth";

// The default redirect path after loggin in
export const DEFAULT_LOGIN_REDIRECT = "/dashboard";

// Booking submissions go directly from the browser to Web3Forms.
// Web3Forms (free plan) only accepts client-side requests, so the
// fetch below lives in the booking form component (src/routes/index.tsx).
// A FormData body keeps it a CORS "simple request" (no preflight).
export const WEB3FORMS_ACCESS_KEY = "92cf3ad6-9bf1-45b6-8ad9-bdf54cb1b55e";
export const WEB3FORMS_ENDPOINT = "https://api.web3forms.com/submit";

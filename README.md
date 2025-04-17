# Next.js Session Bug Demo

This project demonstrates a session refresh issue in Next.js where the session state is not immediately updated after logout until a hard refresh is performed.

## Setup Instructions

1. Install dependencies:
```bash
npm install
# or
bun install
# or
pnpm install
```

2. Run database migrations:
```bash
npm run db:migrate
# or
bun db:migrate
# or
pnpm db:migrate
```

3. Start the development server:
```bash
npm run dev
# or
bun dev
# or
pnpm dev
```

## Known Issue

When testing the authentication flow, you may notice that:

1. After registering a new account, the session state updates correctly
2. After logging out, the session state **does not** update immediately
3. The session state only reflects the logout after performing a hard refresh of the page

This is a demonstration of a session refresh issue in Next.js where the client-side state is not immediately synchronized with the server-side session state after logout.

## Testing Steps

1. Register a new account
2. Verify you are logged in
3. Click the logout button
4. Notice that the UI still shows you as logged in
5. Perform a hard refresh (Ctrl/Cmd + Shift + R)
6. Now the UI correctly shows you as logged out

This issue affects the user experience as it creates a temporary inconsistency between the actual authentication state and what is displayed to the user.


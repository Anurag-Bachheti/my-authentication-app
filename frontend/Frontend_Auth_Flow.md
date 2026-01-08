# Frontend Authentication Flow

The frontend uses React with Context API to manage authentication state.
All authentication logic is centralized inside AuthContext.

---

## Auth State Shape

AuthContext stores:
- user
- access token
- refresh token (admin only)

Data is persisted in localStorage.

---

## 1. Normal Login Flow (Email & Password)

1. User submits login form
2. Frontend calls POST /api/auth/login
3. On success:
   - Store user data
   - Store access token
   - Store refresh token (if provided)
4. Redirect user based on role:
   - admin → /admin
   - user / employee → /dashboard

---

## 2. Google OAuth Login Flow

1. User clicks "Login with Google"
2. Browser redirects to backend OAuth route
3. Google authenticates user
4. Backend redirects to /oauth-success with tokens
5. OAuthSuccess page:
   - Validates OAuth data
   - Stores auth state
   - Redirects user based on role

---

## 3. Protected Routes

Routing rules:
- Unauthenticated users → redirected to /
- Admin-only routes → role check
- User/employee routes → role check

Route access depends on:
- token existence
- user.role value

---

## 4. API Authorization

Axios automatically:
- Attaches access token to every request
- Intercepts 401 responses
- Attempts refresh using refresh token
- Retries original request
- Logs user out if refresh fails

---

## 5. Logout Flow

1. User clicks logout
2. AuthContext clears state
3. localStorage is cleared
4. User is redirected to landing page

---

## Key Frontend Guarantees

- No API call without access token
- Role-based routing enforced client-side
- Auth state always matches backend response shape
- OAuth and local login share the same state logic
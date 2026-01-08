# Backend Authentication Flow

This backend uses JWT-based authentication with optional Google OAuth.
OAuth is used only for identity verification — the backend always issues its own JWTs.

---

## User Model Overview

Each user has:
- name
- email (unique)
- password (hashed, local login only)
- role: admin | user | employee
- provider: local | google
- providerId (OAuth users only)
- refreshToken (admin only)

---

## 1. Email & Password Registration

Route:
POST /api/auth/register

Flow:
1. Validate request body
2. Prevent admin self-registration
3. Hash password using bcrypt
4. Save user in database
5. Return user data (no tokens)

---

## 2. Email & Password Login

Route:
POST /api/auth/login

Flow:
1. Verify email exists
2. Compare password hash
3. Issue JWT access token
4. Issue refresh token only if role === admin
5. Store refresh token in DB (admin only)
6. Return:
   - accessToken
   - refreshToken (admin only)
   - user object

---

## 3. Access Token Verification

Middleware:
verifyToken

Flow:
1. Read Authorization header
2. Verify JWT
3. Attach decoded user info to req.user
4. Continue request

---

## 4. Refresh Token Flow (Admin Only)

Route:
POST /api/auth/refresh

Flow:
1. Read refreshToken from request body
2. Verify token exists in database
3. Verify user role is admin
4. Generate new access token
5. Return new access token

---

## 5. Google OAuth Login

Routes:
GET /api/auth/google  
GET /api/auth/google/callback  

Flow:
1. Redirect user to Google login
2. Google authenticates user
3. Backend receives OAuth callback
4. Backend:
   - Finds or creates user by email
   - Assigns role (default: user)
   - Sets provider = google
5. Backend issues JWT tokens
6. Redirects user to frontend with tokens

---

## 6. Logout

Route:
POST /api/auth/logout

Flow:
1. Read refreshToken
2. Remove refreshToken from database
3. Client clears local auth state

---

## Key Design Decisions

- OAuth does NOT replace JWT
- Backend always controls authorization
- Roles are enforced server-side
- Refresh tokens are restricted to admins
- OAuth provider tokens are never stored
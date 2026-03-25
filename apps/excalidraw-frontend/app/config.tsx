
// Client-side URL (baked at build time, accessible in browser JS)
export const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL ?? "http://localhost:8001"
export const WS_URL = process.env.NEXT_PUBLIC_WS_URL ?? "ws://localhost:8080"

// Server-side URL (runtime env var, used from inside the Next.js Docker container)
// In Docker set: SERVER_BACKEND_URL=http://http-backend:8001
export const SERVER_BACKEND_URL = process.env.SERVER_BACKEND_URL ?? process.env.NEXT_PUBLIC_BACKEND_URL ?? "http://localhost:8001"

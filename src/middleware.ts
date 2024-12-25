import { NextResponse } from "next/server";
import { NextRequest } from "next/server";

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
    const path = request.nextUrl.pathname;
    const isPublic = path === '/login';
    const token = request.cookies.get('token')?.value || ''; 
    console.log("request -> " + request);
    console.log("token -> " + request.cookies);
    if (isPublic && token) {
        return NextResponse.redirect(new URL('/', request.nextUrl));
    }
    if (!isPublic && !token) {
        return NextResponse.redirect(new URL('/login', request.nextUrl));
    } 
}

// See "Matching Paths" below to learn more
export const config = {
    matcher: [
        '/login',
        '/',
        '/products',
        '/products/:id',
        '/orders',
        '/orders/:id',
        '/users',
  ]
}; 

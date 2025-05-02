import { NextResponse } from 'next/server';

export function middleware(request) {
  // 1. Configura los headers CORS
  const response = NextResponse.next();
  response.headers.set('Access-Control-Allow-Origin', '*'); // O usa 'http://localhost:5173' para solo tu frontend
  response.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  response.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  // 2. Manejo de Preflight (OPTIONS)
  if (request.method === 'OPTIONS') {
    return new Response(null, {
      status: 200,
      headers: Object.fromEntries(response.headers),
    });
  }

  return response;
}

// 3. Define en qué rutas se aplicará el middleware (opcional pero recomendado)
export const config = {
  matcher: '/:path*', // Aplica solo a rutas que empiecen con /api
};
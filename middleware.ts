import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(request: NextRequest) {
  const token = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET,
  });
  const { pathname } = request.nextUrl;

  // Redireciona para /login se não estiver autenticado e tentar acessar uma rota protegida
  if (!token && pathname !== "/login") {
    const loginUrl = new URL("/login", request.url);
    return NextResponse.redirect(loginUrl);
  }

  // Redireciona para /dashboard se estiver autenticado e tentar acessar /login
  if (token && pathname === "/login") {
    const dashboardUrl = new URL("/dashboard", request.url);
    return NextResponse.redirect(dashboardUrl);
  }

  // Permite o acesso às outras rotas protegidas
  return NextResponse.next();
}

// Aplicação do middleware apenas às rotas protegidas
export const config = {
  matcher: ["/dashboard", "/task", "/settings", "/login"], // adicione outras rotas conforme necessário
};

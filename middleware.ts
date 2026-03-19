import { NextResponse, type NextRequest } from "next/server";
import { createServerClient } from "@supabase/ssr";

export async function middleware(req: NextRequest) {
  let res = NextResponse.next({
    request: req,
  });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return req.cookies.getAll();
        },
        setAll(cookiesToSet) {
          // Mettre à jour les cookies sur la requête ET la réponse
          cookiesToSet.forEach(({ name, value }) =>
            req.cookies.set(name, value)
          );
          res = NextResponse.next({ request: req });
          cookiesToSet.forEach(({ name, value, options }) =>
            res.cookies.set(name, value, options)
          );
        },
      },
    }
  );

  const { data: { user }, error } = await supabase.auth.getUser();

  const pathname = req.nextUrl.pathname;
  const authPaths = ["/client/auth/login", "/client/auth/register"];

  // Déjà connecté → rediriger hors des pages auth
  if (user && authPaths.includes(pathname)) {
    return NextResponse.redirect(new URL("/client/materiels", req.url));
  }

  // Pas connecté → bloquer les pages client protégées
  if (!user && pathname.startsWith("/client") && !authPaths.includes(pathname)) {
    return NextResponse.redirect(new URL("/client/auth/login", req.url));
  }

  // Pas connecté → bloquer le dashboard admin
  if (!user && pathname.startsWith("/admin/dashboard")) {
    return NextResponse.redirect(new URL("/client/auth/login", req.url));
  }

  return res;
}

export const config = {
  matcher: ["/client/:path*", "/admin/dashboard/:path*"],
};

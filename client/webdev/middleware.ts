import NextAuth from "next-auth"
import authConfig from "./auth.config"
import { apiAuthPrefix, authRoutes, LOGIN_REDIRECT, publicRoutes } from "./routes"
 
export const { auth: middleware } = NextAuth(authConfig)

const checInPublicRoute = (pathname: string) => {
    return publicRoutes.some((route) => 
    typeof route === "string" ? route === pathname : route.test(pathname))
}

// this !! simplify boolean value
export default middleware((req) => {
    const {nextUrl} = req
    const isLoggedIn = !!req.auth
    
    //console.log("Pathname >>>", nextUrl.pathname, isLoggedIn)
    
    const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix) 
    const isPublicRoute = checInPublicRoute(nextUrl.pathname)
    const isAuthRoute = authRoutes.includes(nextUrl.pathname) 
    
    if(isApiAuthRoute) {
        return
    }

    if(isAuthRoute){
        if(isLoggedIn){
            return Response.redirect(new URL(LOGIN_REDIRECT, nextUrl))
        }
        return
    }

    if(!isLoggedIn && !isPublicRoute){
        return Response.redirect(new URL("/login", nextUrl))
    }
    return
 
})

// this makes only when we access login page thats when this middleware will run

export const config = {
  matcher: [
    
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
}
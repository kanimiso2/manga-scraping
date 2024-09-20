// export { auth as middleware } from "./auth"


import { NextResponse,type NextRequest } from 'next/server';

const isLoggedIn: boolean = false;

export function middleware(request: NextRequest ){
    if(!isLoggedIn){
        return NextResponse.redirect(new URL('/',request.url))
    }

}

export const config={
    matcher: "/shelf",
}

import {NextRequest} from "next/server";

export function middleware(request: NextRequest) {
    const {pathname} = request.nextUrl;
    if(pathname.startsWith("/api/")) {
        return NextResponse.next();
    }
    return NextResponse.redirect(new URL("/", request.url));
}
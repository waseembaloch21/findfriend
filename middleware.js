export { auth as middleware } from "./auth"

export default auth((req) => {
    const { nextUrl } = req;
    console.log("nextUrl=>", nextUrl);
  });
  
  export const config = {
    matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
  };
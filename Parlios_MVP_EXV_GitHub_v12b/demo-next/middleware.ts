import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(req: NextRequest){
  const { pathname } = req.nextUrl
  const sess = req.cookies.get('parlios.session')
  const role = req.cookies.get('parlios.role')?.value || 'guest'

  // Protect /dashboard (user+), /admin (admin only)
  if (pathname.startsWith('/dashboard')){
    if (!sess) { const url = req.nextUrl.clone(); url.pathname = '/login'; return NextResponse.redirect(url) }
  }
  if (pathname.startsWith('/admin')){
    if (!sess || role !== 'admin') { const url = req.nextUrl.clone(); url.pathname = '/login'; return NextResponse.redirect(url) }
  }
  return NextResponse.next()
}
export const config = { matcher: ['/dashboard','/admin'] }

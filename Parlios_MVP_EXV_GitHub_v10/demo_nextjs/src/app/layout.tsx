import './globals.css';
import { PropsWithChildren } from 'react';
import { LocaleProvider } from '../lib/i18n';

export const metadata = {
  title: 'Parlios Demo',
  description: 'A11Y & i18n demo',
};

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <html suppressHydrationWarning>
      <body className="min-h-dvh bg-white text-gray-900 antialiased">
        <LocaleProvider>{children}</LocaleProvider>
      </body>
    </html>
  );
}

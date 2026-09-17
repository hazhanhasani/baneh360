import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Baneh360 Admin',
  description: 'پنل مدیریت بانه ۳۶۰',
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="fa" dir="rtl">
      <body>{children}</body>
    </html>
  );
}

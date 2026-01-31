import type { Metadata } from 'next'
import { Inter, Playfair_Display } from 'next/font/google'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
})

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
})

export const metadata: Metadata = {
  title: 'Lya Lush | Exclusive Content Creator',
  description: 'Join Lya Lush for exclusive content, behind-the-scenes access, and premium experiences. Connect with me on all platforms.',
  keywords: ['Lya Lush', 'content creator', 'exclusive content', 'social media'],
  openGraph: {
    title: 'Lya Lush | Exclusive Content Creator',
    description: 'Join Lya Lush for exclusive content and premium experiences.',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
      <body className="font-sans">
        <div className="noise-overlay" />
        {children}
      </body>
    </html>
  )
}

import type { Metadata } from 'next'
import './globals.css'
import { SnackbarProvider } from '@/components/SnackbarProvider'
import Navbar from '@/components/Navbar'

export const metadata: Metadata = {
  title: 'Umbrella',
  description: 'Your budgeting web app',
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='en'>
      <body className='pt-16'>
        <SnackbarProvider>
          <Navbar />
          {children}
        </SnackbarProvider>
      </body>
    </html>
  )
}

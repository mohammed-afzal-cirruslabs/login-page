import type { Metadata } from 'next'
import '@ecom/ui/styles'

export const metadata: Metadata = {
  title: {
    template: '%s | EcomStore',
    default: 'EcomStore — Shop Everything',
  },
  description: 'Amazon-scale e-commerce platform',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-neutral-background text-text-primary antialiased">
        {children}
      </body>
    </html>
  )
}

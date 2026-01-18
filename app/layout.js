import './globals.css'

export const metadata = {
  title: 'ML Trading Predictor',
  description: 'AI-Powered Hourly Trading Predictions',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning>{children}</body>
    </html>
  )
}
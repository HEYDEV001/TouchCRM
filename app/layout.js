import './globals.css'
import { Providers } from './providers'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter', display: 'swap' })

export const metadata = {
  title: 'WOVE — The Autonomous Revenue Operating System',
  description: 'AI-Powered Revenue Operating System for D2C & B2B Enterprises. CRM, Omnichannel, AI Agents, Automation & Analytics — unified.',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={inter.variable}>
      <head>
        <script dangerouslySetInnerHTML={{__html:'window.addEventListener("error",function(e){if(e.error instanceof DOMException&&e.error.name==="DataCloneError"&&e.message&&e.message.includes("PerformanceServerTiming")){e.stopImmediatePropagation();e.preventDefault()}},true);'}} />
      </head>
      <body className="bg-[#D7D7D7] text-black antialiased selection:bg-[#E1FE03] selection:text-black">
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}

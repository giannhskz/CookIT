import './globals.css'
import {Navbar} from '../components/navbar';
import Providers from "./providers"

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <Providers>
      <body>
      
        <header>
          <Navbar/>
        </header>
       {children}
       
      </body>
      </Providers>    
    </html>
  )
}

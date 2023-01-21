import './globals.css'
import {Navbar} from '../components/navbar';
import {Footer} from '../components/footer';
import Providers from "./providers"
export const revalidate = 0;
export const dynamicParams = true
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
       
      </body><Footer /> 
      </Providers> 
        
    </html>
  )
}

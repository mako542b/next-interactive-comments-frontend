import '../styles/globals.css'
import type { AppProps } from 'next/app'
import TokenProvider from '../components/TokenProvider'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <TokenProvider>
      <Component {...pageProps} />
    </TokenProvider>
  )
}

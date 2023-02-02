import '../styles/globals.css'
import type { AppProps } from 'next/app'
import TokenProvider from '../components/TokenProvider'
import Layout from '../components/Layout'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <TokenProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </TokenProvider>
  )
}

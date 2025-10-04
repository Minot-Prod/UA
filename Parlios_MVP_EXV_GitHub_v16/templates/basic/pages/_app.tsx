import type { AppProps } from 'next/app'
import ConsentBanner from '../components/ConsentBanner'
import TelemetryMount from '../components/TelemetryMount'
import '../styles/globals.css'
export default function App({ Component, pageProps }: AppProps){
  return (<>
    <TelemetryMount/>
    <Component {...pageProps} />
    <ConsentBanner/>
  </>)
}

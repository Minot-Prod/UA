import type { AppProps } from 'next/app'
import TelemetryMount from '../components/TelemetryMount'
export default function App({Component, pageProps}: AppProps){
  return (<>
    <TelemetryMount/>
    <Component {...pageProps} />
  </>)
}

import { AppProps } from "next/app";
import "../global.css";

export default function Honor({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}

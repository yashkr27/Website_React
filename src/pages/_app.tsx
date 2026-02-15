import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"], weight: ["400", "600", "700", "800"] });

export default function App({ Component, pageProps }: AppProps) {
  return (
    <main className={inter.className}>
      <Component {...pageProps} />
    </main>
  );
}

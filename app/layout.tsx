import type { Metadata } from "next";
import { Manrope, Orbitron } from "next/font/google";

import "./globals.css";
import Providers from "./providers";
import AppWalletProvider from "./components/AppWalletProvider";
import Script from "next/script";
import { Header } from "./components/Header";
import { WalletModal } from "./components/WalletModal";

const manrope = Manrope({
  weight: ["400", "500"],
  style: ["normal"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-manrope",
});

const orbitron = Orbitron({
  weight: ["400", "500", "600", "700"],
  style: ["normal"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-orbitron",
});

export const metadata: Metadata = {
  title: "Sonic Odyssey",
  description:
    "Description: Sonic testnet is live now! Join the Sonic Odyssey to earn potential airdrops!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const TikTokPixelScript = () => (
    <Script strategy="lazyOnload">
      {`!function (w, d, t) {
  w.TiktokAnalyticsObject=t;var ttq=w[t]=w[t]||[];ttq.methods=["page","track","identify","instances","debug","on","off","once","ready","alias","group","enableCookie","disableCookie"],ttq.setAndDefer=function(t,e){t[e]=function(){t.push([e].concat(Array.prototype.slice.call(arguments,0)))}};for(var i=0;i<ttq.methods.length;i++)ttq.setAndDefer(ttq,ttq.methods[i]);ttq.instance=function(t){for(var e=ttq._i[t]||[],n=0;n<ttq.methods.length;n++)ttq.setAndDefer(e,ttq.methods[n]);return e},ttq.load=function(e,n){var i="https://analytics.tiktok.com/i18n/pixel/events.js";ttq._i=ttq._i||{},ttq._i[e]=[],ttq._i[e]._u=i,ttq._t=ttq._t||{},ttq._t[e]=+new Date,ttq._o=ttq._o||{},ttq._o[e]=n||{};var o=document.createElement("script");o.type="text/javascript",o.async=!0,o.src=i+"?sdkid="+e+"&lib="+t;var a=document.getElementsByTagName("script")[0];a.parentNode.insertBefore(o,a)};
  ttq.load('CPCN5GJC77U09VQADSM0');
  ttq.page();
}(window, document, 'ttq');`}
    </Script>
  );

  const TikTokPixelScriptB = () => (
    <Script strategy="lazyOnload">
      {`!function (w, d, t) {
  w.TiktokAnalyticsObject=t;var ttq=w[t]=w[t]||[];ttq.methods=["page","track","identify","instances","debug","on","off","once","ready","alias","group","enableCookie","disableCookie"],ttq.setAndDefer=function(t,e){t[e]=function(){t.push([e].concat(Array.prototype.slice.call(arguments,0)))}};for(var i=0;i<ttq.methods.length;i++)ttq.setAndDefer(ttq,ttq.methods[i]);ttq.instance=function(t){for(var e=ttq._i[t]||[],n=0;n<ttq.methods.length;n++)ttq.setAndDefer(e,ttq.methods[n]);return e},ttq.load=function(e,n){var i="https://analytics.tiktok.com/i18n/pixel/events.js";ttq._i=ttq._i||{},ttq._i[e]=[],ttq._i[e]._u=i,ttq._t=ttq._t||{},ttq._t[e]=+new Date,ttq._o=ttq._o||{},ttq._o[e]=n||{};var o=document.createElement("script");o.type="text/javascript",o.async=!0,o.src=i+"?sdkid="+e+"&lib="+t;var a=document.getElementsByTagName("script")[0];a.parentNode.insertBefore(o,a)};
  ttq.load('CPFAHQBC77U09VQAFV6G');
  ttq.page();
}(window, document, 'ttq');`}
    </Script>
  );
  return (
    <html lang="en">
      <body
        className={`${manrope.variable} ${orbitron.variable} bg-[#01030C] w-full`}
      >
        <Providers>
          <AppWalletProvider>
            {/* header */}
            <Header />
            {/* chidren */}
            {children}
            {/* wallet modal */}
            <WalletModal />
          </AppWalletProvider>
        </Providers>

        <TikTokPixelScript />
      </body>
    </html>
  );
}

import type { Metadata } from "next";
import Script from "next/script";
import { Manrope, Orbitron } from "next/font/google";

import "./globals.css";
import Providers from "./providers";
import AppWalletProvider from "./components/Basic/AppWalletProvider";
import { Header } from "./components/Basic/Header";
import { Footer } from "./components/Basic/Footer";
import { Toaster } from "@/components/ui/toaster";
import { WalletDialog } from "./components/Dialog/Wallet";
import { MysteryBoxConfirmDialog } from "./components/Dialog/MysteryBoxConfirm";
import { MysteryBoxRecordDialog } from "./components/Dialog/MysteryBoxRecord";
import { MysteryBoxResultDialog } from "./components/Dialog/MysteryBoxResult";
import { WelcomeDialog } from "./components/Dialog/Welcome";
import { MoreWalletDialog } from "./components/Dialog/MoreWallet";
import { SetUpSonicNetworkDialog } from "./components/Dialog/SetUpSonicNetwork";
import { SetUpFinishDialog } from "./components/Dialog/SetUpFinish";
import "../lib/track";

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
    "Join the Sonic Odyssey Testnet Campaign. Earn Your Ring Rewards!",

  openGraph: {
    title: "Sonic Odyssey",
    description:
      "Join the Sonic Odyssey Testnet Campaign. Earn Your Ring Rewards!",
    images: ["https://odyssey.sonic.game/seo-banner.png"],
  },

  twitter: {
    card: "summary_large_image",
    title: "Sonic Odyssey",
    description:
      "Join the Sonic Odyssey Testnet Campaign. Earn Your Ring Rewards!",
    creator: "@SonicSVM",
    images: ["https://odyssey.sonic.game/seo-banner.png"],
  },

  // viewport: {
  //   width: "device-width",
  //   initialScale: 1,
  // },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const TikTokPixelScriptA = () => (
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

  const CriteoScript = () => (
    <>
      <Script
        type="text/javascript"
        src="//dynamic.criteo.com/js/ld/ld.js?a=113598"
        async
      />
      <Script strategy="lazyOnload">
        {`window.criteo_q = window.criteo_q || [];
var deviceType = /iPad/.test(navigator.userAgent) ? "t" : /Mobile|iP(hone|od)|Android|BlackBerry|IEMobile|Silk/.test(navigator.userAgent) ? "m" : "d";
window.criteo_q.push(
  { event: "setAccount", account: 113598 },
  { event: "setSiteType", type: deviceType},
  { event: "viewPage" }
);`}
      </Script>
    </>
  );

  return (
    <html lang="en">
      <body
        className={`${manrope.variable} ${orbitron.variable} bg-[#01030C] font-manrope w-full`}
      >
        <Providers>
          <AppWalletProvider>
            {/* header */}
            <Header />

            {/* chidren */}
            {children}

            {/* footer */}
            {/* <Footer /> */}

            {/* wallet dialog */}
            <WalletDialog />
            <MoreWalletDialog />
            <SetUpSonicNetworkDialog />
            <SetUpFinishDialog />

            {/* welcome dialog */}
            <WelcomeDialog />

            {/* mysterybox confirm dialog */}
            <MysteryBoxConfirmDialog />

            {/* mysterybox record dialog */}
            <MysteryBoxRecordDialog />

            {/* mysterybox result dialog */}
            <MysteryBoxResultDialog />
          </AppWalletProvider>
        </Providers>

        <Toaster />

        <CriteoScript />
        <TikTokPixelScriptA />
        <TikTokPixelScriptB />
      </body>
    </html>
  );
}

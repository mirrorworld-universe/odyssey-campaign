import { MouseEvent } from "react";
import ReactGA from "react-ga4";
// import ttq from "tiktok-pixel";

ReactGA.initialize("G-F5K4V1NH2M", {
  gaOptions: {
    page_variant: "2.0"
  }
});

// if (canUseDOM()) {
// void ttq.init("CPCN5GJC77U09VQADSM0");
// void ttq.init("CPFAHQBC77U09VQAFV6G");
// }

// export { ttq };

export const trackPreviewEvent = ReactGA.send;

export const trackActionEvent = ReactGA.event;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function trackClick({ text }: any) {
  try {
    const page_name = document.title;
    const entry_page = window.location.href;

    // Track Google Analytics
    trackActionEvent("buttonClick", {
      page_name,
      click_time: new Date(),
      entry_page,
      click_button: text
    });

    // Track TikTok Pixel
    // void ttq.track('buttonClick', {
    //   page_name,
    //   click_time: new Date(),
    //   entry_page,
    //   click_button: text
    // });
  } catch (e) {
    console.error(e);
  }
}

export function trackCriteoWalletClick() {
  try {
    (window as any).criteo_q = (window as any).criteo_q || [];
    var deviceType = /iPad/.test(navigator.userAgent)
      ? "t"
      : /Mobile|iP(hone|od)|Android|BlackBerry|IEMobile|Silk/.test(
          navigator.userAgent
        )
      ? "m"
      : "d";
    (window as any).criteo_q.push(
      { event: "setAccount", account: 113598 },
      { event: "setEmail", email: "" },
      { event: "setSiteType", type: deviceType },
      { event: "viewItem", item: "conncectview" }
    );
  } catch (e) {
    console.error(e);
  }
}

export function trackCriteoWalletTransactionClick() {
  try {
    (window as any).criteo_q = (window as any).criteo_q || [];
    var deviceType = /iPad/.test(navigator.userAgent)
      ? "t"
      : /Mobile|iP(hone|od)|Android|BlackBerry|IEMobile|Silk/.test(
          navigator.userAgent
        )
      ? "m"
      : "d";
    (window as any).criteo_q.push(
      { event: "setAccount", account: 113598 },
      { event: "setSiteType", type: deviceType },
      {
        event: "trackTransaction",
        id: Date.now().toString(),
        item: [{ id: "conncectview", price: "1", quantity: "1" }]
      }
    );
  } catch (e) {
    console.error(e);
  }
}

export function trackLinkClick(event: MouseEvent<HTMLAnchorElement>) {
  try {
    const link = event.currentTarget as HTMLAnchorElement;
    const page_name = document.title;
    const entry_page = window.location.href;

    const href = link.href;
    const text = link.innerText;
    const click_module = link.dataset.module || "";
    trackActionEvent("buttonClick", {
      page_name,
      click_time: new Date(),
      entry_page,
      click_link: href,
      click_module,
      click_button: text
    });

    // void ttq.track('buttonClick', {
    //   page_name,
    //   click_time: new Date(),
    //   entry_page,
    //   click_link: href,
    //   click_module,
    //   click_button: text
    // });
  } catch (e) {
    console.error(e);
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function trackRegenerate(event: any) {
  try {
    const dom = event.currentTarget as HTMLAnchorElement;
    const page_name = document.title;
    const entry_page = window.location.href;
    const click_module = dom.dataset.module || "";
    const text = dom.innerText;

    trackActionEvent("Regenerate", {
      page_name,
      click_time: new Date(),
      entry_page,
      click_button: click_module || text
    });
  } catch (e) {
    console.error(e);
  }
}

export function canUseDOM() {
  return (
    typeof window !== "undefined" &&
    typeof document !== "undefined" &&
    document.createElement !== undefined
  );
}

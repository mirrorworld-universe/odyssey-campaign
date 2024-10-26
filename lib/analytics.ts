export const openWalletStatics = () => {
  const ttq = (window as any).ttq;
  ttq?.track("ClickButton", {
    contents: [
      {
        content_id: "0001",
        content_type: "Sonic",
        content_name: "ClickButton"
      }
    ],
    value: "1",
    currency: "USD"
  });
  ttq?.track("CompleteRegistration", {
    contents: [
      {
        content_id: "0002",
        content_type: "Sonic001",
        content_name: "CompleteRegistration_001"
      }
    ],
    value: "1",
    currency: "USD"
  });

  let criteo_q = (window as any).criteo_q;
  criteo_q = criteo_q || [];
  var deviceType = /iPad/.test(navigator.userAgent)
    ? "t"
    : /Mobile|iP(hone|od)|Android|BlackBerry|IEMobile|Silk/.test(
        navigator.userAgent
      )
    ? "m"
    : "d";
  criteo_q.push(
    { event: "setAccount", account: 113598 },
    { event: "setEmail", email: "" },
    { event: "setSiteType", type: deviceType },
    { event: "viewItem", item: "conncectview" }
  );
};

export const connectWalletStatics = () => {
  let criteo_q = (window as any).criteo_q;
  criteo_q = criteo_q || [];
  var deviceType = /iPad/.test(navigator.userAgent)
    ? "t"
    : /Mobile|iP(hone|od)|Android|BlackBerry|IEMobile|Silk/.test(
        navigator.userAgent
      )
    ? "m"
    : "d";
  criteo_q.push(
    { event: "setAccount", account: 113598 },
    { event: "setSiteType", type: deviceType },
    {
      event: "trackTransaction",
      id: Date.now().toString(),
      item: [{ id: "conncectview", price: "1", quantity: "1" }]
    }
  );
};

export const loadHomePageStatics = () => {
  let criteo_q = (window as any).criteo_q;
  criteo_q = criteo_q || [];
  var deviceType = /iPad/.test(navigator.userAgent)
    ? "t"
    : /Mobile|iP(hone|od)|Android|BlackBerry|IEMobile|Silk/.test(
        navigator.userAgent
      )
    ? "m"
    : "d";
  criteo_q.push(
    { event: "setAccount", account: 113598 },
    { event: "setEmail", email: "" },
    { event: "setSiteType", type: deviceType },
    { event: "viewHome" }
  );
};

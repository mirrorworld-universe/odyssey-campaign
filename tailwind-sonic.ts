import plugin from "tailwindcss/plugin";

export default plugin(({ addUtilities }) => {
  addUtilities({
    ".sonic-title1": {
      fontSize: "20px",
      fontWeight: "600",
      lineHeight: "1.4"
    },
    ".sonic-title2": {
      fontSize: "16px",
      fontWeight: "600",
      lineHeight: "1.5"
    },
    ".sonic-title3": {
      fontSize: "14px",
      fontWeight: "600",
      lineHeight: "1.57"
    },
    ".sonic-title4": {
      fontSize: "12px",
      fontWeight: "600",
      lineHeight: "1.5"
    },
    ".sonic-body1": {
      fontSize: "20px",
      lineHeight: "1.4",
      fontWeight: "400"
    },
    ".sonic-body2": {
      fontSize: "16px",
      lineHeight: "1.5",
      fontWeight: "400"
    },
    ".sonic-body3": {
      fontSize: "14px",
      lineHeight: "1.57",
      fontWeight: "400"
    },
    ".sonic-body4": {
      fontSize: "12px",
      lineHeight: "1.5",
      fontWeight: "400"
    },
    ".sonic-headline0": {
      fontSize: "48px",
      fontWeight: "800",
      lineHeight: "1.41"
    },
    ".sonic-headline1": {
      fontSize: "40px",
      fontWeight: "800",
      lineHeight: "1.4"
    },
    ".sonic-headline2": {
      fontSize: "32px",
      fontWeight: "800",
      lineHeight: "1.37"
    },
    ".sonic-headline3": {
      fontSize: "28px",
      fontWeight: "800",
      lineHeight: "1.42"
    },
    ".sonic-headline4": {
      fontSize: "24px",
      fontWeight: "800",
      lineHeight: "1.41"
    },
    ".sonic-headline5": {
      fontSize: "20px",
      fontWeight: "800",
      lineHeight: "1.4"
    },
    ".sonic-caption1": {
      fontSize: "10px",
      fontWeight: "400",
      lineHeight: "1.6"
    }
  });
});

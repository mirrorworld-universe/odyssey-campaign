import plugin from "tailwindcss/plugin";

export default plugin(({ addUtilities }) => {
  addUtilities({
    ".text-title1": {
      fontSize: "20px",
      fontWeight: "600",
      lineHeight: "1.4"
    },
    ".text-title2": {
      fontSize: "16px",
      fontWeight: "600",
      lineHeight: "1.5"
    },
    ".text-title3": {
      fontSize: "14px",
      fontWeight: "600",
      lineHeight: "1.57"
    },
    ".text-title4": {
      fontSize: "12px",
      fontWeight: "600",
      lineHeight: "1.5"
    },
    ".text-body1": {
      fontSize: "20px",
      lineHeight: "1.4",
      fontWeight: "400"
    },
    ".text-body2": {
      fontSize: "16px",
      lineHeight: "1.5",
      fontWeight: "400"
    },
    ".text-body3": {
      fontSize: "14px",
      lineHeight: "1.57",
      fontWeight: "400"
    },
    ".text-body4": {
      fontSize: "12px",
      lineHeight: "1.5",
      fontWeight: "400"
    },
    ".text-headline0": {
      fontSize: "48px",
      fontWeight: "800",
      lineHeight: "1.41"
    },
    ".text-headline1": {
      fontSize: "40px",
      fontWeight: "800",
      lineHeight: "1.4"
    },
    ".text-headline2": {
      fontSize: "32px",
      fontWeight: "800",
      lineHeight: "1.37"
    },
    ".text-headline3": {
      fontSize: "28px",
      fontWeight: "800",
      lineHeight: "1.42"
    },
    ".text-headline4": {
      fontSize: "24px",
      fontWeight: "800",
      lineHeight: "1.41"
    },
    ".text-headline5": {
      fontSize: "20px",
      fontWeight: "800",
      lineHeight: "1.4"
    },
    ".text-caption1": {
      fontSize: "10px",
      fontWeight: "400",
      lineHeight: "1.6"
    }
  });
});

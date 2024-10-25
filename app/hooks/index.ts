import { createBreakpoint } from "react-use";

export const useBreakpoint = createBreakpoint({
  mobile: 350,
  laptop: 1024,
  tablet: 768
});

/**
 * Check if a URL string satisfies the first-level domain whitelist rule.
 * The whitelist is an array of domains, such as ["galxe.com", "galaxy.eco"].
 * @param url The URL to check.
 * @param whitelist Whitelist array.
 * @returns {boolean} `true` if the URL satisfies the whitelist rule, otherwise `false`.
 */
const isWhitelisted = (url: string, whitelist: string[]): boolean => {
  if (url.indexOf("/") === 0) {
    return true;
  }

  try {
    const urlObj = new URL(url);
    const domain = urlObj.hostname;

    if (whitelist.includes(domain)) {
      return true;
    }
  } catch (_ex) {
    // If parsing the URL into an object fails, return false.
    return false;
  }

  return false;
};

/**
 * Get sanitized url
 * @param url
 * @returns
 */
export const sanitizeUrl = (url: string): string => {
  const urlRegex = /^((https?|ftp):\/\/|\.{0,2}\/)/;
  return urlRegex.test(url) ? url : "about:blank";
};

export function openPopup(
  url: string = "",
  name: string = "",
  windowFeatures: string = "",
  unsafe: boolean = false
) {
  // Open the popup and set the opener and referrer policy instruction
  const newWindow = window.open(
    unsafe ? url : sanitizeUrl(url),
    name,
    `noopener,noreferrer,${windowFeatures}`
  );
  // Reset the opener link
  if (newWindow) {
    newWindow.opener = null;
  }
}

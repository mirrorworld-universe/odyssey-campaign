export function Check({
  width = 48,
  height = 48,
  color = "white",
  className = "",
}) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox="0 0 48 48"
      fill="none"
      className={className}
    >
      <rect width="48" height="48" rx="24" fill="#4C4C4C" />
      <mask
        id="maskXcheck"
        style={{
          maskType: "alpha",
        }}
        maskUnits="userSpaceOnUse"
        x="11"
        y="11"
        width="26"
        height="26"
      >
        <rect x="11" y="11" width="26" height="26" fill="#D9D9D9" />
      </mask>
      <g mask="url(#maskXcheck)">
        <path
          d="M21.3189 30.4999L32.8023 19.0165L31.2585 17.4999L21.2919 27.4395L16.7148 22.8353L15.171 24.379L21.3189 30.4999ZM21.3189 33.5603L12.1377 24.379L16.7148 19.7749L21.3189 24.379L31.2314 14.4395L35.8898 18.9895L21.3189 33.5603Z"
          fill={color}
        />
      </g>
    </svg>
  );
}

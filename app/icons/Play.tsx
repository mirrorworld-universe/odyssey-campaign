export function Play({
  width = 32,
  height = 33,
  color = "white",
  className = "",
}) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox="0 0 32 33"
      fill="none"
      className={className}
    >
      <mask
        id="maskXplay"
        style={{
          maskType: "alpha",
        }}
        maskUnits="userSpaceOnUse"
        x="0"
        y="0"
        width="32"
        height="33"
      >
        <rect y="0.5" width="32" height="32" fill="#D9D9D9" />
      </mask>
      <g mask="url(#maskXplay)">
        <path
          d="M10.666 25.8327V7.16602L25.3327 16.4993L10.666 25.8327ZM13.3327 20.966L20.3327 16.4993L13.3327 12.0327V20.966Z"
          fill={color}
        />
      </g>
    </svg>
  );
}

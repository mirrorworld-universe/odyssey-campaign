export function Switch({
  width = 64,
  height = 64,
  color = "white",
  className = "",
}) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox="0 0 64 64"
      fill="none"
      className={className}
    >
      <mask
        id="maskXswitch"
        style={{ maskType: "alpha" }}
        maskUnits="userSpaceOnUse"
        x="0"
        y="0"
        width="64"
        height="64"
      >
        <rect width="64" height="64" fill="#D9D9D9" />
      </mask>
      <g mask="url(#maskXswitch)">
        <path
          d="M19.1999 52.8002L6.3999 40.0002L19.1999 27.2002L22.5999 30.6002L15.5999 37.6002H35.1999V42.4002H15.5999L22.5999 49.4002L19.1999 52.8002ZM44.7999 36.8002L41.3999 33.4002L48.3999 26.4002H28.7999V21.6002H48.3999L41.3999 14.6002L44.7999 11.2002L57.5999 24.0002L44.7999 36.8002Z"
          fill={color}
        />
      </g>
    </svg>
  );
}

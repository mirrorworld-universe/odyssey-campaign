export function Speaker({
  width = 24,
  height = 24,
  color = "white",
  className = "",
}) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox="0 0 24 24"
      fill="none"
      className={className}
    >
      <mask
        id="maskXspeaker"
        style={{
          maskType: "alpha",
        }}
        maskUnits="userSpaceOnUse"
        x="0"
        y="0"
        width="24"
        height="24"
      >
        <rect width="24" height="24" fill="#D9D9D9" />
      </mask>
      <g mask="url(#maskXspeaker)">
        <path
          d="M18 13V11H22V13H18ZM19.2 20L16 17.6L17.2 16L20.4 18.4L19.2 20ZM17.2 8L16 6.4L19.2 4L20.4 5.6L17.2 8ZM5 19V15H2V9H8L13 6V18L8 15H7V19H5ZM11 14.45V9.55L8.55 11H4V13H8.55L11 14.45ZM14 15.35V8.65C14.45 9.05 14.8125 9.5375 15.0875 10.1125C15.3625 10.6875 15.5 11.3167 15.5 12C15.5 12.6833 15.3625 13.3125 15.0875 13.8875C14.8125 14.4625 14.45 14.95 14 15.35Z"
          fill={color}
        />
      </g>
    </svg>
  );
}

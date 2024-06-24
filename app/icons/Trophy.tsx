export function Trophy({
  width = 24,
  height = 24,
  color = "white",
  className = "",
}) {
  return (
    <svg
      width={width}
      height={height}
      viewBox={`0 0 24 24`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <mask
        id="maskXtrophy"
        style={{ maskType: "alpha" }}
        maskUnits="userSpaceOnUse"
        x="0"
        y="0"
        width="24"
        height="24"
      >
        <rect x="0.5" y="0.5" width="64" height="64" fill="#D9D9D9" />
      </mask>
      <g mask="url(#maskXtrophy)">
        <path
          d="M7 21V19H11V15.9C10.1833 15.7167 9.45417 15.3708 8.8125 14.8625C8.17083 14.3542 7.7 13.7167 7.4 12.95C6.15 12.8 5.10417 12.2542 4.2625 11.3125C3.42083 10.3708 3 9.26667 3 8V5H7V3H17V5H21V8C21 9.26667 20.5792 10.3708 19.7375 11.3125C18.8958 12.2542 17.85 12.8 16.6 12.95C16.3 13.7167 15.8292 14.3542 15.1875 14.8625C14.5458 15.3708 13.8167 15.7167 13 15.9V19H17V21H7ZM7 10.8V7H5V8C5 8.63333 5.18333 9.20417 5.55 9.7125C5.91667 10.2208 6.4 10.5833 7 10.8ZM12 14C12.8333 14 13.5417 13.7083 14.125 13.125C14.7083 12.5417 15 11.8333 15 11V5H9V11C9 11.8333 9.29167 12.5417 9.875 13.125C10.4583 13.7083 11.1667 14 12 14ZM17 10.8C17.6 10.5833 18.0833 10.2208 18.45 9.7125C18.8167 9.20417 19 8.63333 19 8V7H17V10.8Z"
          fill={color}
        />
      </g>
    </svg>
  );
}

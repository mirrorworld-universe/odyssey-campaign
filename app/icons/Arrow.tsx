export function Arrow({
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
        id="mask"
        style={{
          maskType: "alpha",
        }}
        maskUnits="userSpaceOnUse"
        x="0"
        y="0"
        width="24"
        height="24"
      >
        <rect
          x="24"
          y="24"
          width="24"
          height="24"
          transform="rotate(180 24 24)"
          fill="#D9D9D9"
        />
      </mask>
      <g mask="url(#mask)">
        <path
          d="M12 8.6L18 14.6L16.6 16L12 11.4L7.4 16L6 14.6L12 8.6Z"
          fill={color}
        />
      </g>
    </svg>
  );
}

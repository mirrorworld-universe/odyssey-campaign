export function Go({
  width = 20,
  height = 20,
  color = "white",
  className = "",
}) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox="0 0 20 20"
      fill="none"
      className={className}
    >
      <mask
        id="maskXgo"
        style={{
          maskType: "alpha",
        }}
        maskUnits="userSpaceOnUse"
        x="0"
        y="0"
        width="20"
        height="20"
      >
        <rect width="20" height="20" fill="white" />
      </mask>
      <g mask="url(#maskXgo)">
        <path
          d="M11.6673 15L10.5007 13.7917L13.459 10.8333H3.33398V9.16667H13.459L10.5007 6.20833L11.6673 5L16.6673 10L11.6673 15Z"
          fill={color}
        />
      </g>
    </svg>
  );
}

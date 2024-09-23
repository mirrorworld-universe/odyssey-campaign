export function Cube({ color = "white", className = "" }) {
  return (
    <svg
      width="135"
      height="84"
      viewBox="0 0 135 84"
      fill="none"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <mask
        id="mask0_54_23289"
        style={{ maskType: "alpha" }}
        maskUnits="userSpaceOnUse"
        x="0"
        y="-25"
        width="147"
        height="147"
      >
        <rect
          x="31.0583"
          y="-25"
          width="120"
          height="120"
          transform="rotate(15 31.0583 -25)"
          fill="#D9D9D9"
        />
      </mask>
      <g mask="url(#mask0_54_23289)">
        <path
          d="M60.0672 84.0708L69.3051 49.5945L43.8036 24.0267L34.5657 58.503L60.0672 84.0708ZM67.3116 86.0119L102.18 76.6204L111.418 42.1441L76.5495 51.5356L67.3116 86.0119ZM74.5996 44.3239L109.042 35.0768L83.8375 9.84763L49.3956 19.0947L74.5996 44.3239ZM26.174 60.8434L38.6918 14.1263L86.0672 1.52618L120.795 36.126L108.278 82.843L60.9023 95.4431L26.174 60.8434Z"
          fill={color}
        />
      </g>
    </svg>
  );
}

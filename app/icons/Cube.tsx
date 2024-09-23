export function Cube({ color = "white", className = "" }) {
  return (
    <svg
      width="301"
      height="301"
      viewBox="0 0 301 301"
      fill="none"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <mask
        id="mask0_194_16644"
        style={{ maskType: "alpha" }}
        maskUnits="userSpaceOnUse"
        x="0"
        y="0"
        width="301"
        height="301"
      >
        <rect
          x="0.711792"
          y="0.711731"
          width="300"
          height="300"
          fill="#D9D9D9"
        />
      </mask>
      <g mask="url(#mask0_194_16644)">
        <path
          d="M141.337 245.327V156.096L63.2118 110.855V200.087L141.337 245.327ZM160.087 245.327L238.212 200.087V110.855L160.087 156.096V245.327ZM150.712 139.943L227.899 95.3274L150.712 50.7117L73.5243 95.3274L150.712 139.943ZM44.4618 211.168L44.4618 90.2555L150.712 29.1742L256.962 90.2555V211.168L150.712 272.249L44.4618 211.168Z"
          fill={color}
        />
      </g>
    </svg>
  );
}

export function Calendar({
  width = 300,
  height = 300,
  color = "white",
  className = "",
}) {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 300 300"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <g>
        <mask
          id="mask"
          style={{
            maskType: "alpha",
          }}
          maskUnits="userSpaceOnUse"
          x="0"
          y="0"
          width="300"
          height="300"
        >
          <rect x="0.207031" width="300" height="300" fill="#D9D9D9" />
        </mask>
        <g mask="url(#mask)">
          <path
            d="M137.083 224.805L97.0361 184.759L110.592 171.202L137.083 197.693L189.824 144.952L203.38 158.509L137.083 224.805ZM43.958 268.749L43.958 56.2492L83.8611 56.2492L83.8611 29.8086L103.092 29.8086L103.092 56.2492L197.805 56.2492L197.805 29.8086L216.555 29.8086L216.555 56.2492L256.458 56.2492L256.458 268.749L43.958 268.749ZM62.708 249.999L237.708 249.999L237.708 128.846L62.708 128.846L62.708 249.999ZM62.708 110.096L237.708 110.096L237.708 74.9992L62.708 74.9992L62.708 110.096Z"
            fill={color}
          />
        </g>
      </g>
    </svg>
  );
}

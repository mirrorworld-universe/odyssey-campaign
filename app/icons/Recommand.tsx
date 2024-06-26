export function Recommand({
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
          id="maskXrecommend"
          style={{ maskType: "alpha" }}
          maskUnits="userSpaceOnUse"
          x="0"
          y="0"
          width="300"
          height="300"
        >
          <rect width="300" height="300" fill="#D9D9D9" />
        </mask>
        <g mask="url(#maskXrecommend)">
          <path
            d="M83.6564 301.134V202.565L41.9502 132.313L95.9158 41.4102H204.091L258.056 132.313L216.35 202.565V301.134L150.003 277.785L83.6564 301.134ZM102.406 273.587L150.003 257.13L197.6 273.587V223.217H102.406V273.587ZM106.372 60.8894L63.8721 132.313L106.372 203.737H193.635L236.135 132.313L193.635 60.8894H106.372ZM136.878 180.612L96.9502 139.456L110.316 125.57L136.878 153.166L189.691 97.9747L203.056 111.536L136.878 180.612Z"
            fill={color}
          />
        </g>
      </g>
    </svg>
  );
}

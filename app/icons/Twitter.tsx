export function Twitter({
  width = 300,
  height = 300,
  color = "white",
  className = "",
}) {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <g id="twitter">
        <path
          d="M14.6586 2.80078H17.1423L11.7162 8.89943L18.0996 17.1983H13.1014L9.1867 12.1651L4.70737 17.1983H2.22219L8.02595 10.6751L1.90234 2.80078H7.02737L10.5659 7.40134L14.6586 2.80078ZM13.7869 15.7364H15.1631L6.27956 4.1859H4.80272L13.7869 15.7364Z"
          fill={color}
        />
      </g>
    </svg>
  );
}

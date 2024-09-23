export function Cube({
  width = 215,
  height = 233,
  color = "white",
  className = ""
}) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox="0 0 215 233"
      fill="none"
      className={className}
    >
      <path
        d="M85.1678 206.677L108.263 120.486L44.5088 56.5669L21.414 142.758L85.1678 206.677ZM103.279 211.53L190.451 188.051L213.546 101.86L126.374 125.339L103.279 211.53ZM121.499 107.31L207.604 84.1921L144.594 21.1191L58.4889 44.2369L121.499 107.31ZM0.434879 148.608L31.7293 31.8159L150.168 0.315518L236.989 86.815L205.694 203.608L87.2555 235.108L0.434879 148.608Z"
        fill={color}
      />
    </svg>
  );
}

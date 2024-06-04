export function Gift({
  width = 20,
  height = 21,
  color = "white",
  className = "",
}) {
  return (
    <svg
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <g id="gift">
        <mask
          id="mask0_3897_12163"
          style={{
            maskType: "alpha",
          }}
          maskUnits="userSpaceOnUse"
          x="0"
          y="0"
          width={width}
          height={height}
        >
          <rect
            id="Bounding box"
            y="0.5"
            width={width}
            height={width}
            fill="#D9D9D9"
          />
        </mask>
        <g mask="url(#mask0_3897_12163)">
          <path
            id="featured_seasonal_and_gifts_2"
            d="M3.33415 18.832V9.66536H1.66748V4.66536H6.00081C5.93137 4.54036 5.88623 4.40842 5.8654 4.26953C5.84456 4.13064 5.83415 3.98481 5.83415 3.83203C5.83415 3.13759 6.0772 2.54731 6.56331 2.0612C7.04942 1.57509 7.6397 1.33203 8.33415 1.33203C8.65359 1.33203 8.9522 1.39106 9.22998 1.50911C9.50776 1.62717 9.7647 1.79036 10.0008 1.9987C10.2369 1.77648 10.4939 1.60981 10.7716 1.4987C11.0494 1.38759 11.348 1.33203 11.6675 1.33203C12.3619 1.33203 12.9522 1.57509 13.4383 2.0612C13.9244 2.54731 14.1675 3.13759 14.1675 3.83203C14.1675 3.98481 14.1536 4.12717 14.1258 4.25911C14.098 4.39106 14.0564 4.52648 14.0008 4.66536H18.3341V9.66536H16.6675V18.832H3.33415ZM11.6675 2.9987C11.4314 2.9987 11.2335 3.07856 11.0737 3.23828C10.914 3.398 10.8341 3.59592 10.8341 3.83203C10.8341 4.06814 10.914 4.26606 11.0737 4.42578C11.2335 4.5855 11.4314 4.66536 11.6675 4.66536C11.9036 4.66536 12.1015 4.5855 12.2612 4.42578C12.421 4.26606 12.5008 4.06814 12.5008 3.83203C12.5008 3.59592 12.421 3.398 12.2612 3.23828C12.1015 3.07856 11.9036 2.9987 11.6675 2.9987ZM7.50081 3.83203C7.50081 4.06814 7.58067 4.26606 7.7404 4.42578C7.90012 4.5855 8.09804 4.66536 8.33415 4.66536C8.57026 4.66536 8.76818 4.5855 8.9279 4.42578C9.08762 4.26606 9.16748 4.06814 9.16748 3.83203C9.16748 3.59592 9.08762 3.398 8.9279 3.23828C8.76818 3.07856 8.57026 2.9987 8.33415 2.9987C8.09804 2.9987 7.90012 3.07856 7.7404 3.23828C7.58067 3.398 7.50081 3.59592 7.50081 3.83203ZM3.33415 6.33203V7.9987H9.16748V6.33203H3.33415ZM9.16748 17.1654V9.66536H5.00081V17.1654H9.16748ZM10.8341 17.1654H15.0008V9.66536H10.8341V17.1654ZM16.6675 7.9987V6.33203H10.8341V7.9987H16.6675Z"
            fill={color}
          />
        </g>
      </g>
    </svg>
  );
}

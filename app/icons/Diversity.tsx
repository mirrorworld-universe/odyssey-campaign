export function Diversity({
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
          <rect width="300" height="300" fill={color} />
        </mask>
        <g mask="url(#mask)">
          <path
            d="M112.019 295.413C102.435 295.413 93.9417 292.608 86.5375 286.998C79.1354 281.388 73.7115 273.954 70.2656 264.697C67.3323 269.158 63.474 272.592 58.6906 274.998C53.9073 277.403 48.9271 278.605 43.75 278.605C34.0875 278.605 25.9427 275.134 19.3156 268.19C12.6885 261.247 9.375 252.815 9.375 242.893C9.375 234.253 12.1719 226.429 17.7656 219.421C23.3573 212.41 30.4323 208.614 38.9906 208.032C35.4323 203.87 32.6521 199.167 30.65 193.922C28.6458 188.678 27.6438 183.184 27.6438 177.44C27.6438 169.51 29.5594 162.074 33.3906 155.133C37.2198 148.194 42.5885 142.51 49.4969 138.082C50.301 140.986 51.3875 144.093 52.7563 147.403C54.125 150.712 55.6344 153.616 57.2844 156.113C53.8865 158.827 51.274 162.076 49.4469 165.859C47.6198 169.645 46.7063 173.613 46.7063 177.764C46.7063 190.551 51.4979 198.622 61.0813 201.977C70.6646 205.332 80.1281 207.958 89.4719 209.856L93.8469 217.622C91.5552 224.548 89.6354 230.425 88.0875 235.254C86.5417 240.081 85.7687 244.484 85.7687 248.464C85.7687 255.756 88.3 262.137 93.3625 267.606C98.4229 273.075 104.602 275.81 111.9 275.81C120.298 275.81 127.221 272.234 132.669 265.083C138.117 257.932 142.587 249.484 146.081 239.738C149.575 229.989 152.268 220.05 154.159 209.918C156.051 199.787 157.598 191.766 158.8 185.855L177.162 191.049C175.369 200.207 173.198 210.771 170.65 222.742C168.102 234.713 164.5 246.088 159.844 256.866C155.188 267.647 149.061 276.767 141.466 284.225C133.87 291.683 124.054 295.413 112.019 295.413ZM43.75 259.129C48.0938 259.129 51.7844 257.551 54.8219 254.396C57.8573 251.24 59.375 247.406 59.375 242.893C59.375 238.383 57.8573 234.55 54.8219 231.394C51.7844 228.238 48.0938 226.661 43.75 226.661C39.4083 226.661 35.7188 228.238 32.6813 231.394C29.6438 234.55 28.125 238.383 28.125 242.893C28.125 247.406 29.6438 251.24 32.6813 254.396C35.7188 257.551 39.4083 259.129 43.75 259.129ZM126.131 206.707C117.108 198.333 108.891 190.512 101.478 183.245C94.0656 175.979 87.6781 168.887 82.3156 161.97C76.951 155.053 72.8281 148.134 69.9469 141.215C67.0656 134.297 65.625 127.11 65.625 119.651C65.625 106.496 69.9594 95.4158 78.6281 86.4099C87.2969 77.404 97.9625 72.901 110.625 72.901C112.179 72.901 113.57 72.9973 114.797 73.19C116.022 73.3804 117.251 73.6001 118.484 73.849C117.572 71.769 116.868 69.6599 116.372 67.5215C115.874 65.3853 115.625 63.1408 115.625 60.7882C115.625 50.8689 118.966 42.4376 125.647 35.4943C132.328 28.5489 140.441 25.0762 149.984 25.0762C159.53 25.0762 167.648 28.5489 174.338 35.4943C181.029 42.4376 184.375 50.8689 184.375 60.7882C184.375 63.169 184.126 65.3874 183.628 67.4436C183.132 69.4997 182.428 71.5688 181.516 73.651C182.749 73.4021 183.978 73.2148 185.203 73.0893C186.43 72.9638 187.821 72.901 189.375 72.901C200.352 72.901 209.795 76.3802 217.703 83.3387C225.611 90.2992 230.64 99.0324 232.787 109.538C229.931 109.056 226.718 108.814 223.147 108.814C219.574 108.814 216.29 108.989 213.294 109.337C211.435 104.359 208.398 100.289 204.181 97.1267C199.967 93.9624 195.049 92.3803 189.428 92.3803C181.861 92.3803 175.906 94.536 171.562 98.8474C167.219 103.161 161.425 109.663 154.181 118.353H145.506C138.054 109.312 132.156 102.724 127.813 98.5877C123.469 94.4494 117.74 92.3803 110.625 92.3803C103.058 92.3803 96.7917 94.9602 91.825 100.12C86.8583 105.28 84.375 111.79 84.375 119.651C84.375 124.655 85.6688 129.823 88.2563 135.153C90.8458 140.486 94.5219 146.129 99.2844 152.081C104.049 158.033 109.826 164.364 116.616 171.073C123.407 177.783 131.033 185.033 139.494 192.825L126.131 206.707ZM150 77.0209C154.344 77.0209 158.033 75.4441 161.069 72.2907C164.106 69.135 165.625 65.3008 165.625 60.7882C165.625 56.2776 164.106 52.4445 161.069 49.2889C158.033 46.1333 154.344 44.5554 150 44.5554C145.656 44.5554 141.967 46.1333 138.931 49.2889C135.894 52.4445 134.375 56.2776 134.375 60.7882C134.375 65.3008 135.894 69.135 138.931 72.2907C141.967 75.4441 145.656 77.0209 150 77.0209ZM187.428 295.539C183.653 295.539 179.922 295.05 176.234 294.072C172.545 293.091 168.984 291.541 165.553 289.419C167.278 287.127 169.003 284.425 170.728 281.313C172.453 278.201 174.021 275.334 175.431 272.713C177.504 273.871 179.576 274.698 181.647 275.193C183.718 275.689 185.789 275.937 187.859 275.937C195.247 275.937 201.501 273.205 206.622 267.742C211.743 262.282 214.303 255.789 214.303 248.263C214.303 244.177 213.53 239.767 211.984 235.033C210.436 230.302 208.517 224.473 206.225 217.548L210.722 209.782C220.272 207.884 229.786 205.236 239.266 201.837C248.745 198.442 253.484 190.35 253.484 177.563C253.484 167.99 250.172 160.965 243.547 156.487C236.92 152.008 229.559 149.769 221.466 149.769C212.891 149.769 202.886 151.375 191.453 154.587C180.02 157.801 166.731 162.031 151.587 167.275L146.588 148.195C161.875 143.117 175.562 138.822 187.65 135.309C199.735 131.797 210.831 130.04 220.938 130.04C234.431 130.04 246.354 134.186 256.706 142.478C267.058 150.769 272.234 162.465 272.234 177.563C272.234 183.273 271.253 188.695 269.291 193.832C267.328 198.97 264.568 203.703 261.009 208.032C269.568 208.699 276.643 212.495 282.234 219.421C287.828 226.347 290.625 234.171 290.625 242.893C290.625 252.717 287.311 261.126 280.684 268.119C274.057 275.11 265.913 278.605 256.25 278.605C251.073 278.605 246.093 277.403 241.309 274.998C236.526 272.592 232.668 269.158 229.734 264.697C226.289 273.954 220.824 281.408 213.341 287.059C205.857 292.713 197.22 295.539 187.428 295.539ZM256.562 259.129C260.904 259.129 264.542 257.551 267.475 254.396C270.408 251.24 271.875 247.406 271.875 242.893C271.875 238.383 270.356 234.496 267.319 231.232C264.281 227.968 260.592 226.336 256.25 226.336C251.906 226.336 248.216 227.914 245.178 231.069C242.143 234.225 240.625 238.058 240.625 242.569C240.625 247.081 242.195 250.97 245.334 254.233C248.476 257.497 252.219 259.129 256.562 259.129Z"
            fill={color}
          />
        </g>
      </g>
    </svg>
  );
}

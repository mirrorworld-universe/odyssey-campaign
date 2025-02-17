import { SVGProps } from "react";
export function InfoILogo({ className, ...props }: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="64"
      height="64"
      viewBox="0 0 64 64"
      fill="none"
      className={className}
      {...props}
    >
      <path
        d="M31.986 19.1996C30.662 19.1996 29.5333 18.7283 28.6 17.7856C27.6666 16.8429 27.2 15.7096 27.2 14.3856C27.2 13.0616 27.6713 11.9329 28.614 10.9996C29.5566 10.0663 30.69 9.59961 32.014 9.59961C33.338 9.59961 34.4666 10.0709 35.4 11.0136C36.3333 11.9563 36.8 13.0896 36.8 14.4136C36.8 15.7376 36.3286 16.8663 35.386 17.7996C34.4433 18.7329 33.31 19.1996 31.986 19.1996ZM28 54.3996V25.5996H36V54.3996H28Z"
        fill="currentColor"
      />
    </svg>
  );
}

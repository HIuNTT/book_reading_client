import { SVGProps } from 'react'

export default function ButtonRead(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="100%"
      height="100%"
      viewBox="0 0 42 42"
      fill="currentColor"
      {...props}
    >
      <g filter="url(#filter0_b_4990_15993)">
        <path
          d="M42 21C42 32.598 32.598 42 21 42C9.40202 42 0 32.598 0 21C0 9.40202 9.40202 0 21 0C32.598 0 42 9.40202 42 21Z"
          fill="currentColor"
          fillOpacity="1"
        />
      </g>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M22 30.3447C22.3787 30.2581 22.7482 30.1215 23.098 29.9351C24.0862 29.4083 25.2922 28.8378 26.2551 28.5837C27.0335 28.3783 28.0924 28.264 29.0476 28.2043C30.6436 28.1044 32 26.8049 32 25.127V13.9155C32 12.2134 30.4716 11 29 11C27.9312 11 26.3769 11.1634 25.2132 11.5118C24.189 11.8184 23.0491 12.4125 22.1729 12.9195C22.1163 12.9523 22.0586 12.9827 22 13.0108V30.3447ZM20 13.0883C19.9148 13.055 19.8312 13.0168 19.7497 12.9737C18.7511 12.4457 17.4205 11.8103 16.2551 11.5028C15.5249 11.3101 14.5968 11.1023 13.6725 11.0282L13.6725 11.0282C13.4471 11.0101 13.222 11 13 11H13C11.4926 11 10 12.2858 10 13.9801V25.127C10 26.8049 11.3564 28.1044 12.9524 28.2043C13.9076 28.264 14.9665 28.3783 15.7449 28.5837C16.7078 28.8378 17.9138 29.4083 18.902 29.9351C19.2518 30.1215 19.6213 30.2581 20 30.3447V13.0883Z"
        fill="white"
      />
      <defs>
        <filter
          id="filter0_b_4990_15993"
          x="-16"
          y="-16"
          width="74"
          height="74"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feGaussianBlur in="BackgroundImageFix" stdDeviation="8" />
          <feComposite in2="SourceAlpha" operator="in" result="effect1_backgroundBlur_4990_15993" />
          <feBlend mode="normal" in="SourceGraphic" in2="effect1_backgroundBlur_4990_15993" result="shape" />
        </filter>
      </defs>
    </svg>
  )
}

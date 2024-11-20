import { SVGProps } from 'react'

export default function ArrowLeft(props: SVGProps<SVGSVGElement>) {
  return (
    <svg width="100%" height="100%" viewBox="0 0 29 39" version="1.1" xmlns="http://www.w3.org/2000/svg" {...props}>
      <defs>
        <path
          d="M1001.5057,187.169783 L1001.5057,189.489783 C1001.50581,190.042067 1001.05809,190.489783 1000.50581,190.489783 C1000.50577,190.489783 1000.50573,190.489783 1000.5057,190.489677 L987.8257,190.488343 L987.8257,190.488343 L987.8257,203.169783 C987.8257,203.722067 987.377985,204.169783 986.8257,204.169783 L984.5057,204.169783 C983.953415,204.169783 983.5057,203.722067 983.5057,203.169783 L983.5057,189.049783 L983.5057,189.049783 C983.5057,187.531502 984.680564,186.287625 986.170762,186.177682 L986.3857,186.169783 L989.447804,186.169783 L1000.5057,186.169783 C1001.05798,186.169783 1001.5057,186.617498 1001.5057,187.169783 Z"
          id="path-arrow-focus"
        ></path>
        <filter x="-61.1%" y="-61.1%" width="222.2%" height="222.2%" filterUnits="objectBoundingBox" id="filter-2">
          <feMorphology radius="0.5" operator="dilate" in="SourceAlpha" result="shadowSpreadOuter1"></feMorphology>
          <feOffset dx="0" dy="0" in="shadowSpreadOuter1" result="shadowOffsetOuter1"></feOffset>
          <feGaussianBlur stdDeviation="3.5" in="shadowOffsetOuter1" result="shadowBlurOuter1"></feGaussianBlur>
          <feComposite in="shadowBlurOuter1" in2="SourceAlpha" operator="out" result="shadowBlurOuter1"></feComposite>
          <feColorMatrix
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 0"
            type="matrix"
            in="shadowBlurOuter1"
          ></feColorMatrix>
        </filter>
      </defs>
      <g id="控件" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
        <g id="Banner/1024备份" transform="translate(-982.000000, -175.000000)" fillRule="nonzero">
          <g
            id="箭头+阴影"
            transform="translate(992.505700, 195.169783) scale(-1, 1) rotate(-45.000000) translate(-992.505700, -195.169783) "
          >
            <use fill="black" fillOpacity="1" filter="url(#filter-2)" xlinkHref="#path-arrow-focus"></use>
            <path
              strokeOpacity="0.157501434"
              stroke="#000000"
              strokeWidth="0.5"
              d="M1000.5057,185.919783 C1000.85088,185.919783 1001.16338,186.059694 1001.38958,186.285899 C1001.61579,186.512105 1001.7557,186.824605 1001.7557,187.169783 L1001.7557,187.169783 L1001.7557,189.489735 C1001.75576,189.8085 1001.63646,190.099384 1001.4401,190.320201 C1001.23827,190.547158 1000.95495,190.699931 1000.63615,190.733049 L1000.63615,190.733049 L988.0757,190.738239 L988.0757,203.169783 C988.0757,203.51496 987.935789,203.82746 987.709583,204.053666 C987.483378,204.279871 987.170878,204.419783 986.8257,204.419783 L986.8257,204.419783 L984.5057,204.419783 C984.160522,204.419783 983.848022,204.279871 983.621816,204.053666 C983.395611,203.82746 983.2557,203.51496 983.2557,203.169783 L983.2557,203.169783 L983.2557,189.049783 C983.2557,188.227768 983.57259,187.479774 984.09084,186.921263 C984.614966,186.356419 985.345098,185.985505 986.161672,185.927687 L986.161672,185.927687 Z"
              fill="#FFFFFF"
              fillRule="evenodd"
            ></path>
          </g>
        </g>
      </g>
    </svg>
  )
}

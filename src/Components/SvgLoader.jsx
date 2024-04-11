import React from "react";

const SvgLoader = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 100 100"
      preserveAspectRatio="xMidYMid"
      width="150"
      height="150"
      style={{
        shapeRendering: "auto",
        display: "block",
        backgroundColor: 'rgba(0, 0, 0, 0)',
      }}
      xmlns:xlink="http://www.w3.org/1999/xlink"
    >
      <g>
        <circle
          cx="50"
          cy="50"
          r="32"
          stroke-width="8"
          stroke="#fe718d"
          stroke-dasharray="50.26548245743669 50.26548245743669"
          fill="none"
          stroke-linecap="round"
        >
          <animateTransform
            attributeName="transform"
            type="rotate"
            repeatCount="indefinite"
            dur="1.075268817204301s"
            keyTimes="0;1"
            values="0 50 50;360 50 50"
          ></animateTransform>
        </circle>
        <g></g>
      </g>
    </svg>
  );
};

export default SvgLoader;

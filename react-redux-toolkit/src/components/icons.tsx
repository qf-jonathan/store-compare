import { SVGProps } from "react";

const defaultProps: SVGProps<SVGSVGElement> = {
  width: 16,
  height: 16,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: "2",
  strokeLinecap: "round",
  strokeLinejoin: "round",
};

export const TrashIcon = (customProps: SVGProps<SVGSVGElement>) => {
  return (
    <svg
      {...defaultProps}
      {...customProps}
    >
      <path d="M3 6h18"/>
      <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/>
      <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/>
      <line x1="10" x2="10" y1="11" y2="17"/>
      <line x1="14" x2="14" y1="11" y2="17"/>
    </svg>
  );
};

export const CloseIcon = (customProps: SVGProps<SVGSVGElement>) => {
  return (
    <svg
      {...defaultProps}
      {...customProps}
    >
      <path d="M18 6 6 18"/>
      <path d="m6 6 12 12"/>
    </svg>
  );
};

export const EditIcon = (customProps: SVGProps<SVGSVGElement>) => {
  return (
    <svg
      {...defaultProps}
      {...customProps}
    >
      <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"/>
      <path d="m15 5 4 4"/>
    </svg>
  );
};

export const CheckIcon = (customProps: SVGProps<SVGSVGElement>) => {
  return (
    <svg
      {...defaultProps}
      {...customProps}
    >
      <path d="M20 6 9 17l-5-5"/>
    </svg>
  );
};

enum RotateDirection {
  Up = "rotate-0",
  Right = "rotate-90",
  Down = "rotate-180",
  Left = "-rotate-90",
}

type Rotate = keyof typeof RotateDirection;

const ChevronUp = ({
  rotate = "Up",
  small,
}: {
  rotate?: Rotate;
  small?: boolean;
}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={small ? 3 : 1.5}
    stroke="currentColor"
    className={`${small ? "w-2 h-2" : "w-4 h-4"} ${RotateDirection[rotate]}`}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M4.5 15.75l7.5-7.5 7.5 7.5"
    />
  </svg>
);
export { ChevronUp };

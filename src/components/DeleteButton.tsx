import { JSX } from 'preact/jsx-runtime'

export default function ({
  fn,
}: {
  fn: (e: JSX.TargetedMouseEvent<HTMLButtonElement>) => Promise<void>
}) {
  return (
    <td>
      <button className="btn btn-ghost btn-xs h-min" onClick={fn}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-4 w-4"
          fill="none"
          viewBox="0 0 16 16"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M4 12L12 4M4 4l8 8"
          />
        </svg>
      </button>
    </td>
  )
}

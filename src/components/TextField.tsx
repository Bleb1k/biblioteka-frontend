export default function ({ p = '' }: { p?: string }) {
  return (
    <td className="min-w-fit">
      <input
        type="text"
        defaultValue={p}
        className={'input input-xs w-full max-w-xs bg-transparent '}
      />
    </td>
  )
}

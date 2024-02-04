export default function filterOutValues<V>(
  obj:
    | {
        [s: string]: V
      }
    | ArrayLike<V>
) {
  return Object.fromEntries(
    Object.entries(obj).filter(([, value]) => value != '')
  )
}

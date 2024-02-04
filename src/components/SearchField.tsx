import { useAtom } from 'jotai'
import filterOutValues from 'helpers/filterOutValues'
import userInfo from 'atoms/userInfo'

export default function ({
  p: placeholder,
  d: data,
}: {
  p?: string
  d?: string
}) {
  let timing: number = 0
  const [usrInf, setUsrInf] = useAtom(userInfo)

  return (
    <input
      type="text"
      placeholder={placeholder}
      data={data}
      className="input input-xs w-full max-w-xs"
      onInput={(e) => {
        timing = e.timeStamp
        setTimeout(() => {
          if (timing != e.timeStamp) return ''
          const { value } = e.target as HTMLInputElement

          setUsrInf(filterOutValues({ ...usrInf, [data as string]: value }))
        }, 300)
      }}
    />
  )
}

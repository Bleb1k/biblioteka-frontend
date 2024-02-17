import 'datepickerdate/lib/index.css'
import { Datepicker } from 'datepickerdate'

export default function DatePicker() {
  // const a = <a className="border-accent" />
  return (
    <Datepicker
      formatter={(str: string) =>
        `Return date: ${new Date(str).toLocaleDateString()}`
      }
      name="testPick"
      value={new Date(new Date().getTime() + 26400000 * 7)} // a week by default
      onDateChanged={(name: string, date: string) =>
        console.log(`${name}: ${date}`)
      }
    />
  )
}

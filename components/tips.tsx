import { Tip } from '../shared/types'

interface IProps {
  tips: Tip[]
}

export function Tips ({ tips }: IProps) {
  return <div>
      Tips Section
  </div>
}
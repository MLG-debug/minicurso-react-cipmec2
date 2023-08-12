import { Clipboard } from '@/components/Clipboard'
import Header from '@/components/Header'
import { TaskAdder } from '@/components/TaskAdder'

export default function Home() {

  return (
    <div>
      <Header />

      <div className='
      max-w-[46rem]
      my-auto
      mx-auto
      px-4
      flex
      flex-col
      justify-center
      '>
        <TaskAdder />
        <Clipboard />
      </div>

    </div>
  )
}

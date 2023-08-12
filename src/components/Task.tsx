import { Check, Trash } from "@/assets/Icons";
import { useTasksContext } from "@/contexts/TasksContext";
import { TaskEntity } from "@/interfaces/TaskEntity";
import { ChangeEvent, useState } from "react";

interface TaskProps {
  task: TaskEntity
}

export function Task({ task }: TaskProps) {
  const [checkedState, setCheckedState] = useState(task.checked);
  const [deleted, setDeleted] = useState(false);

  const { deleteTask,updateTask } = useTasksContext()

  const handleCheckInput = (event: ChangeEvent<HTMLInputElement>) => {
    setCheckedState(event.target.checked);
    updateTask(task.id);
  }

  const handleDeleteTask = () => {
    setDeleted(true)
    setTimeout(() => {
      deleteTask(task.id)
    }, 500)
  }
  
  return (
    <div
    className={
      `mt-6 flex justify-between 
      items-start p-4 bg-zinc-800 rounded-lg
      outline-1 outline-zinc-400 
      hover:scale-[101%]
      transition-all
      ${checkedState ? 'opacity-50' : ''}
      ${deleted ? 'opacity-0 -translate-x-[100vw]' : ''}
      `
    }
    >
      <div
        className="flex text-sm items-center"
      >
        <label
          className="
            flex items-center cursor-pointer
          "
        >
          <div>
            <Check
              size={20}
              className={
                checkedState ? "text-white bg-violet-600 border-2 border-violet-600 rounded-[50%] p-[0.1rem]" 
                : "bg-transparent rounded-[50%] p-[0.1rem] border-2 border-blue-600 text-transparent"
              }
            />
          </div>
          <input
            defaultChecked={task.checked}
            onChange={handleCheckInput}

            className="
             opacity-0
            "
            type="checkbox" />
          <p
            className={`text-zinc-200 select-none ${checkedState ? 'line-through' : ''}`}
          >
            {task.description}
          </p>
        </label>
      </div>
      <button
        onClick={handleDeleteTask}
        className="
        border-none 
        outline-none 
        bg-transparent 
        text-zinc-400
        hover:text-zinc-100
        transition-colors
        "
      >
        <Trash size={20} />
      </button>
    </div>
  )
}
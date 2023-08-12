"use client"

import { PlusCircle } from "@/assets/Icons";
import { useTasksContext } from "@/contexts/TasksContext";
import { TaskEntity } from "@/interfaces/TaskEntity";
import { ChangeEvent, FormEvent, useState } from "react";

export function TaskAdder() {
  const [newTaskText, setNewTaskText] = useState('')

  const { createNewTask } = useTasksContext()

  const handleChangeText = (event: ChangeEvent<HTMLInputElement>) => {
    setNewTaskText(event.target.value)
  }

  const handleCreateNewTask = (event: FormEvent) => {
    event.preventDefault();

    const newTask: TaskEntity = {
      checked: false,
      description: newTaskText,
      id: crypto.randomUUID()
    }

    createNewTask(newTask)

    setNewTaskText("")
  }

  return (

    <form
      onSubmit={handleCreateNewTask}
      className='
          -mt-[2rem]
          flex
          justify-between
          mb-16
          gap-2
        '
    >
      <label className="group
        flex
        items-center
        transition-colors
        w-full
        bg-zinc-800
        text-white
        rounded-lg
        border-2
        border-zinc-700
        focus-within:border-violet-600
      ">
        <span className="mx-[-75px] p-4 pr-0 whitespace-nowrap text-gray-300 pointer-events-none opacity-0 group-focus-within:opacity-100 group-focus-within:mx-[0px] transition-all">Descrição da tarefa</span>
        <input
          value={newTaskText}
          onChange={handleChangeText}

          placeholder='Adicione uma nova tarefa'
          className='
            p-4
            w-full
            bg-transparent
            outline-none
          '
        />
      </label>
      <button
        className='
            p-4
            text-zinc-300
            bg-blue-600
            rounded-lg
            text-lg
            flex
            justify-center
            items-center
            gap-1
            '
      >
        Criar
        <PlusCircle size={22} />
      </button>
    </form>

  )
}
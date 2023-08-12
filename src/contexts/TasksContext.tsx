import { ChangeEvent, FormEvent, ReactNode, createContext, useCallback, useContext, useEffect, useState } from "react";
import { TaskEntity } from "../interfaces/TaskEntity";

interface TasksContextProps {
  tasks: TaskEntity[]
  createNewTask: (newTask: TaskEntity) => void
  updateTask: (id: string) => void
  deleteTask: (id: string) => void
  
} 

interface TasksContextProviderProps {
  children: ReactNode
}

export const TasksContext = createContext({} as TasksContextProps)

export const TasksContextProvider = ({children}: TasksContextProviderProps) => {
  const [tasks, setTasks] = useState<TaskEntity[]>([])
  

  const createNewTask = (newTask: TaskEntity) => {
    setTasks((state) => {
      const tasks = [newTask, ...state]
      updateLocalStorage(tasks);
      return tasks
    });
  }

  const updateTask = (id: string) => {
    const completedTask = tasks.filter((task) => task.id === id);
    if(completedTask.length === 0) return alert('Tarefa não encontrada')
    
    completedTask[0].checked = !completedTask[0].checked;
    const filteredTasks = tasks.filter((task) => task.id !== id);

    if (completedTask[0].checked) { // vai ficar por último
      const tasks = [...filteredTasks, ...completedTask]
      setTasks(tasks)
      updateLocalStorage(tasks);
    } else {
      const tasks = [...completedTask, ...filteredTasks]
      setTasks(tasks)
      updateLocalStorage(tasks);
    }
  }

  const deleteTask = (id: string) => {
    const filteredTasks = tasks.filter((task) => task.id !== id)
    setTasks(filteredTasks);
    updateLocalStorage(filteredTasks);
  }

  const updateLocalStorage = (tasks: TaskEntity[]) => {
    localStorage.setItem('@todo-list-task', JSON.stringify(tasks));
  }

  const getTasks = useCallback(
    () => {
      const tasks = localStorage.getItem('@todo-list-task');
      if (tasks) {
        setTasks(JSON.parse(tasks));
      }
    },
    []
  )
  

  useEffect(() => {
    getTasks()
  }, [getTasks])

  return (
    <TasksContext.Provider
    value={{
      tasks,
      createNewTask,
      deleteTask,
      updateTask
    }}
    >
      {children}
    </TasksContext.Provider>
  )
}

export const useTasksContext = () => useContext(TasksContext)

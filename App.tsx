/** @format */

import { useEffect, useState } from "react";
import "./App.css";
import { supabase } from "./supabase";
interface task {
  id: number;
  text: string;
  isComplete: boolean;
}
function App() {
  // Define state to store the tasks
  const [tasks, setTasks] = useState<task[]>([]);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const { data, error } = await supabase.from("taskList").select("*");
      if (error) {
        console.error("Error fetching tasks:", error);
      } else {
        setTasks(data as task[]);
      }
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  return (
    <>
      <div>
        <h2>Task List</h2>
        <ul>
          {tasks.map((task) => (
            <li key={task.id}>
              {task.text} {task.isComplete.toString()}
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
export default App;

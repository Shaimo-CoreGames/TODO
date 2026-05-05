import { useEffect, useState } from 'react'
import axios from 'axios'
// Add Plus and Trash2 to your imports here
import { CheckCircle, Circle, Plus, Trash2 } from 'lucide-react'

function App() {
  const [todos, setTodos] = useState([])
  const [newTitle, setNewTitle] = useState("") // Grouped hooks together

  // Fetch Todos on load
  useEffect(() => {
    axios.get('http://127.0.0.1:8000/todos')
      .then(res => setTodos(res.data))
      .catch(err => console.error(err))
  }, [])

  // Add Todo function
  const addTodo = async () => {
    if (!newTitle) return;
    try {
      const response = await axios.post('http://127.0.0.1:8000/todos', { title: newTitle,completed: false});
      setTodos([...todos, response.data]); 
      setNewTitle(""); // empties input field after adding a todo
    } catch (error) {
      console.error("Error adding todo:", error);
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8">
        <h1 className="text-3xl font-extrabold text-slate-800 mb-6 text-center">Task Master</h1>

        {/* Input Area */}
        <div className="flex gap-2 mb-6">
          <input
            type="text"
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
            className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="What needs to be done?"
          />
          <button
            onClick={addTodo}
            className="bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700 transition"
          >
            <Plus size={24} />
          </button>
        </div>

        {/* Todo List */}
        <div className="space-y-3">
          {todos.map(todo => (
            <div key={todo.id} className="flex items-center justify-between p-4 bg-slate-50 rounded-xl group border border-transparent hover:border-blue-200 transition">
              <div className="flex items-center gap-3">
                <button className="text-slate-400 hover:text-blue-500">
                  {todo.completed ? <CheckCircle className="text-green-500" /> : <Circle />}
                </button>
                <span className={todo.completed ? "line-through text-slate-400" : "text-slate-700"}>
                  {todo.title}
                </span>
              </div>
              <button className="text-slate-300 hover:text-red-500 opacity-0 group-hover:opacity-100 transition">
                <Trash2 size={18} />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App
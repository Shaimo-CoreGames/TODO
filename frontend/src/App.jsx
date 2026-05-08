import { useEffect, useState } from 'react'
import axios from 'axios'
// Add Plus and Trash2 to your imports here
import { LogOut, CheckCircle, Circle, Plus, Trash2 } from 'lucide-react'
import Login from './Login';

function App() {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [todos, setTodos] = useState([]) // State for our list of todos to display
  const [newTitle, setNewTitle] = useState("") // Grouped hooks together 

  // Fetch Todos on load
  // Add [token] to the dependency array
  useEffect(() => {
    if (token) {
      fetchTodos();
    }
  }, [token]);

  const fetchTodos = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:8000/todos', {
        headers: { Authorization: `Bearer ${token}` } // Send the token!
      });
      setTodos(response.data);
    } catch (error) {
      console.error("Fetch failed", error);
    }
  };

  const addTodo = async () => {
    if (!newTitle) return;
    try {
      const response = await axios.post('http://127.0.0.1:8000/todos',
        { title: newTitle, completed: false },
        { headers: { Authorization: `Bearer ${token}` } } // Add this!
      );
      setTodos([...todos, response.data]);
      setNewTitle("");
    } catch (error) {
      console.error("Error adding todo:", error);
    }
  };

  // DELETE Logic
  const deleteTodo = async (id) => {
    try {
      await axios.delete(`http://127.0.0.1:8000/todos/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      // Update UI by filtering out the deleted item
      setTodos(todos.filter(todo => todo.id !== id));
    } catch (error) {
      console.error("Delete failed", error);
    }
  };

  // TOGGLE (Update) Logic
  const toggleComplete = async (id) => {
    try {
      const response = await axios.put(`http://127.0.0.1:8000/todos/${id}`);
      // Update the specific item in our state
      setTodos(todos.map(todo => (todo.id === id ? response.data : todo)));
    } catch (error) {
      console.error("Toggle failed", error);
    }
  };

  if (!token) {
    return <Login setToken={setToken} />;
  }

  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center p-4 relative">

      {/* Logout Button: Absolute positioned to the top right of the screen */}
      <button
        onClick={() => { localStorage.removeItem("token"); setToken(null); }}
        className="absolute top-6 right-6 flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-sm text-slate-600 hover:text-red-600 hover:shadow-md transition-all font-medium border border-slate-200"
      >
        <LogOut size={18} />
        <span>Logout</span>
      </button>

      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8">
        <h1 className="text-3xl font-extrabold text-slate-800 mb-6 text-center">Task Master</h1>

        {/* Input Area */}
        <div className="flex gap-2 mb-6">
          <input
            type="text"
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
            className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-700"
            placeholder="What needs to be done?"
          />
          <button
            onClick={addTodo}
            className="bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700 transition shadow-lg active:scale-95"
          >
            <Plus size={24} />
          </button>
        </div>

        {/* Todo List mapping code... */}
        <div className="space-y-3">
          {/* Todo List - Single Map Block */}
          <div className="space-y-3">
            {todos.map((todo) => (
              <div
                key={todo.id}
                className="flex items-center justify-between p-4 bg-slate-50 rounded-xl group border border-transparent hover:border-blue-200 hover:bg-white hover:shadow-md transition-all duration-200"
              >
                <div className="flex items-center gap-3">
                  {/* Click circle to toggle complete */}
                  <button
                    onClick={() => toggleComplete(todo.id)}
                    className="transition-transform active:scale-90"
                  >
                    {todo.completed ? (
                      <CheckCircle className="text-green-500" />
                    ) : (
                      <Circle className="text-slate-300 hover:text-blue-500" />
                    )}
                  </button>

                  <span className={`transition-all ${todo.completed ? "line-through text-slate-400" : "text-slate-700 font-medium"}`}> {todo.title}
                  </span>
                </div>

                {/* Click trash to delete */}
                <button
                  onClick={() => deleteTodo(todo.id)}
                  className="text-slate-300 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity duration-200 p-1"
                  title="Delete task"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            ))}

            {/* Empty State message */}
            {todos.length === 0 && (
              <p className="text-center text-slate-400 py-10 italic">No tasks yet. Add one above!</p>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}

export default App
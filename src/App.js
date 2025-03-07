import "./App.css";
import { Outlet } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";

function App() {
  return (
    <div className="App">
      <Toaster />
      <main>
        <Outlet />
      </main>
    </div>
  );
}

export default App;

import { Outlet } from "react-router-dom";
import "./App.css";

function App() {
  return (
    <div className="appDiv">
      <Outlet />
    </div>
  );
}

export default App;

import AppRoutes from "./routes/routes";
import { NavLink } from "react-router-dom";

//css
import './App.css';


function App() {
  return (
    <div className="App">
      <nav>
        <ul>
          <li><NavLink to="/">Home</NavLink></li>
          <li><NavLink to="/create">create new</NavLink></li>
        </ul>
      </nav>
      <AppRoutes/>
    </div>
  );
}

export default App;

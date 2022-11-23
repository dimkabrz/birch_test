import './App.css';
import SideBar from "./components/UI/Sidebar/SideBar";
import NavBar from "./components/UI/NavBar/NavBar";
import WorkSpace from "./components/WorkSpace/WorkSpace";

function App() {
  return (
          <div className="App">
              <NavBar/>
              <WorkSpace/>
          </div>
  );
}

export default App;

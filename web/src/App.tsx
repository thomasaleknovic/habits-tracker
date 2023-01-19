import "./styles/global.css";
import Habit from "./components/Habit";

function App() {
  return (
    <>
      <Habit completed={3} />
      <Habit completed={10} />
      <Habit completed={20} />
    </>
  );
}

export default App;

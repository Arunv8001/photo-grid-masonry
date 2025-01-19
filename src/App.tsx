import "./App.css";
import MasonryLayout from "./components/Masonrylayout";

function App() {
  return (
    <div className="app-layout">
      <h1 style={{ textAlign: "center" }}>Virtualized Masonry Grid</h1>
      <MasonryLayout />
    </div>
  );
}

export default App;

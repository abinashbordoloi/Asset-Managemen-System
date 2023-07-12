import "./App.css";
import AssetEntryScreen from "./components/AssetEntryScreen";
import Navbar from "./components/Navbar";

function App() {
  return (
    <div className="App">
      <div className="container">
        <Navbar />
        <AssetEntryScreen />
      </div>
    </div>
  );
}

export default App;

import "./App.css";
// import AssetEntryScreen from "./components/AssetEntryScreen";
import Navbar from "./components/Navbar";
import SupplyOrderScreen from "./components/SupplyOrderScreen";

function App() {
  return (
    <div className="App">
      <div className="container">
        <Navbar />
        {/* <AssetEntryScreen /> */}
        <SupplyOrderScreen />
      </div>
    </div>
  );
}

export default App;

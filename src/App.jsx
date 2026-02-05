import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import PasswordGenerator from "./components/PasswordGenerator";

function App() {
  return (
    <div className="bg-black">
      <PasswordGenerator />
    </div>
  );
}

export default App;

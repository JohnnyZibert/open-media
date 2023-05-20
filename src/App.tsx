import React from "react";
import "./app.module.css";
import { PlayerAndFormBlock } from "./components/PalyerAndFormBlock/PlayerAndFormBlock";
import { TechnicalTable } from "./components/TechnicalSchedale/TechnicalTable";

function App() {
  return (
    <div>
      <PlayerAndFormBlock />
      <TechnicalTable />
    </div>
  );
}

export default App;

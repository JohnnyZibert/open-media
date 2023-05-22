import { PlayerAndFormBlock } from "../widgets/PalyerAndFormBlock/PlayerAndFormBlock";
import { TechnicalTable } from "features/TechnicalSchedale/ui/TechnicalTable";
import "./styles/app.module.css";

function App() {
  return (
    <div>
      <PlayerAndFormBlock />
      <TechnicalTable />
    </div>
  );
}

export default App;

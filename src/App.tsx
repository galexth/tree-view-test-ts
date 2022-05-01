import data from "./data/data.json";
import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";
import Table from "./components/TreeViewCheckbox/Table/Table";
import List from "./components/TreeViewCheckbox/List/List";
config.autoAddCss = false;

function App() {
  const config = {
    title: "title",
    headers: {
      title: "Title",
      sessions: "Sessions",
      users: "Users",
      phones: "Phones",
      leads: "Leads",
    },
  };

  return (
    <div>
      {/* <List nodes={data} config={config} /> */}
      <Table nodes={data} config={config} />
    </div>
  );
}

export default App;

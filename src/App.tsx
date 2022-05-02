import data from "./data/data.json";
import Table from "./components/TreeViewCheckbox/Table/Table";

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
      <Table nodes={data} config={config} />
    </div>
  );
}

export default App;

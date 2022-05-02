import { ComponentStory } from "@storybook/react";
import Table from "./Table/Table";
import data from "../../data/data.json";
import "../../index.css";

export default {
  title: "TreeView",
  component: Table,
};

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

export const WithHeaders: ComponentStory<typeof Table> = () => (
  <Table nodes={data} config={config} />
);

export const WithoutHeaders: ComponentStory<typeof Table> = () => (
  <Table nodes={data} config={{ ...config, headers: {} }} />
);

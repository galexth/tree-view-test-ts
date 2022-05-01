export type Node = {
  childs?: Array<Node>;
  [key: string]: unknown;
};

export enum CheckState {
  Unchecked = 0,
  Checked = 1,
  HalfChecked = 2,
}

export type Columns = Array<keyof Node>;

export type Config = {
  title: keyof Node;
  headers: {
    [index: string]: string;
  };
};

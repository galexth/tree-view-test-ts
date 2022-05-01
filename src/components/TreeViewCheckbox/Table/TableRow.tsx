import { ReactNode, useState } from "react";
import { Cell, Brick } from "./TableRow.styled";
import Checkbox from "../Checkbox";
import { CheckState, Columns, Node } from "../types";
import Chevron from "../Chevron";

type Props = {
  item: Node;
  nodeId: string;
  columns: Columns;
  title: keyof Node;
  checked: boolean;
  checkState: CheckState;
  onChange: (nodeId: string, checked: boolean) => void;
  children: ReactNode;
  depth: number;
};

export default function TableRow(props: Props) {
  const [open, setOpen] = useState(false);

  const {
    item,
    nodeId,
    columns,
    title,
    checked,
    checkState,
    onChange,
    children,
    depth,
  } = props;

  const hasChildren = item.childs && item.childs.length > 0;

  const handleChange = () => {
    onChange(nodeId, !checked);
  };

  const handleCollapse = () => {
    if (hasChildren) {
      setOpen((prev) => !prev);
    }
  };

  return (
    <>
      <tr>
        <Cell onClick={handleCollapse}>
          {[...Array(depth + +!hasChildren)].map((_, i) => (
            <Brick key={nodeId + i} />
          ))}
          {hasChildren && <Chevron expanded={open} />}
          <Checkbox
            title={item[title] as string}
            checkState={checkState}
            handleChange={handleChange}
          />
        </Cell>
        {columns
          .filter((col) => col !== title)
          .map((col) => (
            <Cell key={nodeId + col}>{item[col] as string}</Cell>
          ))}
      </tr>
      {open && children}
    </>
  );
}

import { ReactNode, useState } from "react";
import Checkbox from "../Checkbox";
import { Collapse } from "./ListItem.styled";
import { CheckState, Node } from "../types";
import Chevron from "../Chevron";

type Props = {
  item: Node;
  nodeId: string;
  title: keyof Node;
  checked: boolean;
  checkState: CheckState;
  onChange: (nodeId: string, checked: boolean) => void;
  children: ReactNode;
};

export default function ListItem(props: Props) {
  const [open, setOpen] = useState(false);

  const { item, checked, nodeId, title, checkState, onChange, children } =
    props;

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
    <li>
      <div onClick={handleCollapse}>
        {hasChildren && <Chevron expanded={open} />}
        <Checkbox
          title={item[title] as string}
          checkState={checkState}
          handleChange={handleChange}
        />
      </div>
      <Collapse open={open}>
        <ul>{children}</ul>
      </Collapse>
    </li>
  );
}

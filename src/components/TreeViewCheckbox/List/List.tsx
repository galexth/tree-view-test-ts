import React from "react";
import Model from "../Model";
import { Config, Node } from "../types";
import ListItem from "./ListItem";

type Props = {
  nodes: Node[];
  config: Config;
};

type State = {
  model: Model;
};

class List extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    const model = new Model(props.config, props.nodes);

    this.state = { model };

    this.onChange = this.onChange.bind(this);
  }

  onChange(id: string, value: boolean) {
    const clone = this.state.model.clone();
    clone.toggleChecked(id, value);
    this.setState({ model: clone });
  }

  renderNodes(nodes: Node[], nodeId: string = "") {
    const { model } = this.state;
    const { config } = this.props;

    return nodes.map((item) => {
      let id: string = `${nodeId}/${item[config.title]}`;

      const flatNode = model.getNode(id);

      const children = item.childs ? this.renderNodes(item.childs, id) : null;

      flatNode.checkState = model.getCheckState(flatNode);

      return (
        <ListItem
          key={id}
          nodeId={id}
          title={config.title}
          item={item}
          checkState={flatNode.checkState}
          checked={flatNode.checked}
          onChange={this.onChange}
        >
          {children}
        </ListItem>
      );
    });
  }

  render() {
    return <ul>{this.renderNodes(this.props.nodes)}</ul>;
  }
}

export default List;

import React from "react";
import Model from "../Model";
import { Config, Node } from "../types";
import TableRow from "./TableRow";

type Props = {
  nodes: Node[];
  config: Config;
};

type State = {
  model: Model;
};

class Table extends React.Component<Props, State> {
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

  renderNodes(nodes: Node[], depth: number = 0, nodeId: string = "") {
    const { model } = this.state;
    const { config } = this.props;

    return nodes.map((item) => {
      let id: string = `${nodeId}/${item[config.title]}`;

      const flatNode = model.getNode(id);

      const children = item.childs
        ? this.renderNodes(item.childs, depth + 1, id)
        : null;

      flatNode.checkState = model.getCheckState(flatNode);

      const columns = Object.keys(config.headers) as (keyof Node)[];

      return (
        <TableRow
          key={id}
          nodeId={id}
          title={config.title}
          columns={columns}
          item={item}
          depth={depth}
          checkState={flatNode.checkState}
          checked={flatNode.checked}
          onChange={this.onChange}
        >
          {children}
        </TableRow>
      );
    });
  }

  renderHeaders() {
    const { headers } = this.props.config;
    return Object.values(headers).map((header) => (
      <th key={header}>{header}</th>
    ));
  }

  render() {
    return (
      <table>
        <thead>
          <tr>{this.renderHeaders()}</tr>
        </thead>
        <tbody>{this.renderNodes(this.props.nodes)}</tbody>
      </table>
    );
  }
}

export default Table;

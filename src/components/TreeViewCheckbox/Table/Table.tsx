import React from "react";
import Model from "../Model";
import { Config, Node } from "../types";
import TableRow from "./TableRow";
import { isEqual } from "lodash";
import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";
config.autoAddCss = false;

type Props = {
  nodes: Node[];
  config: Config;
};

type State = {
  model: Model;
  nodes: Node[];
  config: Config;
};

class Table extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    const model = new Model(props.config, props.nodes);

    this.state = { model, ...props };

    this.onChange = this.onChange.bind(this);
  }

  static getDerivedStateFromProps(nextProps: Props, prevState: State) {
    if (!isEqual(nextProps.nodes, prevState.nodes)) {
      return {
        ...nextProps,
        model: new Model(nextProps.config, nextProps.nodes),
      };
    }

    return null;
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
    const headers = this.renderHeaders();

    return (
      <table>
        {headers.length > 0 && (
          <thead>
            <tr>{headers}</tr>
          </thead>
        )}
        <tbody>{this.renderNodes(this.props.nodes)}</tbody>
      </table>
    );
  }
}

export default Table;

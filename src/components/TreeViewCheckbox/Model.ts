import { CheckState, Config, Node } from "./types";

type FlatNode = {
  nodeId: string;
  checked: boolean;
  checkState: CheckState;
  parentId: string;
  childs: FlatNode[];
};

type flatNodes = {
  [index: string]: FlatNode;
};

class Model {
  config: Config;
  flatNodes: flatNodes;

  constructor(config: Config, nodes: Node[] = []) {
    this.config = config;
    this.flatNodes = {};

    if (nodes.length > 0) {
      this.reduce(nodes).forEach((item) => {
        this.flatNodes[item.nodeId] = item;
      }, this);
    }
  }

  setFlatNodes(nodes: flatNodes) {
    this.flatNodes = nodes;
    return this;
  }

  reduce(array: Array<Node>, parentId: string = ""): FlatNode[] {
    return array.reduce((acc: Array<any>, item: Node) => {
      const nodeId = `${parentId}/${item[this.config.title]}`;

      const reduced = this.reduce(item.childs || [], nodeId);

      return [
        ...acc,
        {
          nodeId: nodeId,
          checked: false,
          checkState: CheckState.Unchecked,
          parentId,
          childs: reduced,
        },
        ...reduced,
      ];
    }, []);
  }

  getNode(id: string) {
    return this.flatNodes[id];
  }

  hasChildren(node: FlatNode) {
    return node.childs.length > 0;
  }

  clone() {
    const clone = new Model(this.config);
    return clone.setFlatNodes(Object.assign({}, this.flatNodes));
  }

  toggleChecked(id: string, value: boolean, bubble: boolean = true) {
    const node = this.getNode(id);

    node.checked = value;

    if (this.hasChildren(node)) {
      node.childs.forEach((child) => {
        this.toggleChecked(child.nodeId, value, false);
      });
    }

    if (bubble && node.parentId) {
      this.toggleParent(node.parentId, value);
    }

    return this;
  }

  toggleParent(id: string, value: boolean) {
    const node = this.getNode(id);

    node.checked = this.isEveryChildChecked(node);

    if (node.parentId) {
      this.toggleParent(node.parentId, value);
    }
  }

  getCheckState(node: FlatNode) {
    if (!this.hasChildren(node)) {
      return node.checked ? CheckState.Checked : CheckState.Unchecked;
    }
    if (this.isEveryChildInCheckedState(node)) {
      return CheckState.Checked;
    }

    if (this.isSomeChildrenInCheckedState(node)) {
      return CheckState.HalfChecked;
    }

    return CheckState.Unchecked;
  }

  isEveryChildChecked(node: FlatNode) {
    return node.childs.every((child) => this.getNode(child.nodeId).checked);
  }

  isEveryChildInCheckedState(node: FlatNode) {
    return node.childs.every(
      (child) => this.getNode(child.nodeId).checkState === CheckState.Checked
    );
  }

  isSomeChildrenInCheckedState(node: FlatNode) {
    return node.childs.some(
      (child) => this.getNode(child.nodeId).checkState > CheckState.Unchecked
    );
  }
}
export default Model;

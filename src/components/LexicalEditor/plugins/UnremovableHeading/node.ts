import { HeadingNode, HeadingTagType, SerializedHeadingNode } from "@lexical/rich-text"
import { LexicalNode } from "lexical"

export class UnremovableHeadingNode extends HeadingNode {
  static getType() {
    return "unremovable-heading"
  }

  static clone(node: UnremovableHeadingNode) {
    return new UnremovableHeadingNode(node.__tag)
  }
  static importJSON(serializedNode: SerializedHeadingNode): HeadingNode {
    return super.importJSON(serializedNode)
  }

  exportJSON(): SerializedHeadingNode {
    return { ...super.exportJSON(), type: "unremovable-heading" }
  }

  remove() {
    return
  }
  replace<N extends LexicalNode>(): N {
    return new UnremovableHeadingNode(this.__tag, this.__key) as unknown as N
  }
}

export const $createUnremovableHeading = (tag: HeadingTagType) => {
  return new UnremovableHeadingNode(tag)
}

import { LexicalNode, ParagraphNode, SerializedParagraphNode } from "lexical"

const type = "custom-paragraph"
class CustomParagraphNode extends ParagraphNode {
  static getType(): string {
    return type
  }
  static clone(node: CustomParagraphNode): CustomParagraphNode {
    return new CustomParagraphNode(node.__key)
  }
  static importJSON(serializedNode: SerializedParagraphNode): ParagraphNode {
    return super.importJSON(serializedNode)
  }

  exportJSON(): SerializedParagraphNode {
    return { ...super.exportJSON(), type }
  }

  createDOM(): HTMLElement {
    // Define the DOM element here
    const dom = document.createElement("p")
    dom.style.color = "red"
    return dom
  }
}

export function $createCustomParagraphNode(): CustomParagraphNode {
  return new CustomParagraphNode()
}

export function $isCustomParagraphNode(node: LexicalNode | null | undefined): node is CustomParagraphNode {
  return node instanceof CustomParagraphNode
}

export default CustomParagraphNode

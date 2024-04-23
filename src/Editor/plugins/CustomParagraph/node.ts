import { ElementNode, LexicalNode, SerializedElementNode, SerializedLexicalNode } from "lexical"

class CustomParagraphNode extends ElementNode {
  static getType(): string {
    return "custom-paragraph"
  }
  static clone(node: CustomParagraphNode): CustomParagraphNode {
    return new CustomParagraphNode(node.__key)
  }

  static importJSON(_serializedNode: SerializedLexicalNode): LexicalNode {
    return super.importJSON(_serializedNode)
  }

  exportJSON(): SerializedElementNode<SerializedLexicalNode> {
    return this.exportJSON()
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

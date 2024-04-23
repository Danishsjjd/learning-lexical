import { ElementNode, LexicalNode } from "lexical"

class CustomParagraph extends ElementNode {
  static getType(): string {
    return "custom-paragraph"
  }
  static clone(node: CustomParagraph): CustomParagraph {
    return new CustomParagraph(node.__key)
  }

  createDOM(): HTMLElement {
    // Define the DOM element here
    const dom = document.createElement("p")
    dom.style.color = "red"
    return dom
  }

  updateDOM(prevNode: CustomParagraph, dom: HTMLElement): boolean {
    console.log({ prevNode, dom })
    // Returning false tells Lexical that this node does not need its
    // DOM element replacing with a new copy from createDOM.
    return false
  }
}

export function $createCustomParagraphNode(): CustomParagraph {
  return new CustomParagraph()
}

export function $isCustomParagraphNode(node: LexicalNode | null | undefined): node is CustomParagraph {
  return node instanceof CustomParagraph
}

export default CustomParagraph

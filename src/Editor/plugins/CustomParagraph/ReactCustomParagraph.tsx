import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext"
import { useEffect } from "react"
import registerCustomParagraph from "./plugin"

export function ReactCustomParagraphPlugin() {
  const [editor] = useLexicalComposerContext()

  useEffect(() => {
    return registerCustomParagraph(editor)
  }, [editor])

  return null
}

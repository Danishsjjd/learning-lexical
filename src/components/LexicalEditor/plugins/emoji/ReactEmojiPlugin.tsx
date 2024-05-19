import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext"
import { registerEmoji } from "./EmojiPlugin"
import { useEffect } from "react"

export function ReactEmojiPlugin() {
  const [editor] = useLexicalComposerContext()

  useEffect(() => {
    return registerEmoji(editor)
  }, [editor])

  return null
}

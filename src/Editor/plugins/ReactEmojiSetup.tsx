import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext"
import useLayoutEffectImpl from "../shared/useLayoutEffect"
import { registerEmoji } from "./emoji/EmojiPlugin"

export function ReactEmojiSetup(): void {
  const [editor] = useLexicalComposerContext()

  useLayoutEffectImpl(() => {
    return registerEmoji(editor)
  }, [editor])
}

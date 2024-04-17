import type { LexicalEditor } from "lexical"

import { registerDragonSupport } from "@lexical/dragon"
import { registerRichText } from "../../rich-text/index"
import { mergeRegister } from "@lexical/utils"
import useLayoutEffectImpl from "../../../shared/useLayoutEffect"

export function useRichTextSetup(editor: LexicalEditor): void {
  useLayoutEffectImpl(() => {
    return mergeRegister(registerRichText(editor), registerDragonSupport(editor))
  }, [editor])
}

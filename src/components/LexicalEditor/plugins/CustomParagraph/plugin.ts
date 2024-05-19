import { mergeRegister } from "@lexical/utils"
import { $getSelection, COMMAND_PRIORITY_EDITOR, LexicalEditor, createCommand } from "lexical"
import { $setBlocksType } from "@lexical/selection"
import { $createCustomParagraphNode } from "./node"

export const INSERT_CUSTOM_PARAGRAPH_COMMAND = createCommand()

export default function registerCustomParagraph(editor: LexicalEditor) {
  return mergeRegister(
    editor.registerCommand(
      INSERT_CUSTOM_PARAGRAPH_COMMAND,
      () => {
        editor.update(() => {
          const selection = $getSelection()
          $setBlocksType(selection, () => $createCustomParagraphNode())
        })

        return false
      },
      COMMAND_PRIORITY_EDITOR
    )
  )
}

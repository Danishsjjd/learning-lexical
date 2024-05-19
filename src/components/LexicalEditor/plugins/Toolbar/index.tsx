import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext"
import { mergeRegister } from "@lexical/utils"
import {
  $getSelection,
  $isRangeSelection,
  CAN_REDO_COMMAND,
  CAN_UNDO_COMMAND,
  FORMAT_ELEMENT_COMMAND,
  FORMAT_TEXT_COMMAND,
  REDO_COMMAND,
  SELECTION_CHANGE_COMMAND,
  UNDO_COMMAND,
} from "lexical"
import { useCallback, useEffect, useState } from "react"
import { toolbarClasses } from "../../../../data"
import Divider from "../../../Divider"
import ToolbarButton, { itemClasses } from "../../../ToolbarButton"
import { INSERT_CUSTOM_PARAGRAPH_COMMAND } from "../CustomParagraph/plugin"

const LowPriority = 1

function ToolbarPlugin() {
  const [editor] = useLexicalComposerContext()

  const [canUndo, setCanUndo] = useState(false)
  const [canRedo, setCanRedo] = useState(false)
  const [isBold, setIsBold] = useState(false)
  const [isItalic, setIsItalic] = useState(false)
  const [isInlineCode, setIsInlineCode] = useState(false)
  const [isUnderline, setIsUnderline] = useState(false)
  const [isStrikethrough, setIsStrikethrough] = useState(false)

  const $updateToolbar = useCallback(() => {
    const selection = $getSelection()
    if ($isRangeSelection(selection)) {
      // Update text format
      setIsBold(selection.hasFormat("bold"))
      setIsItalic(selection.hasFormat("italic"))
      setIsUnderline(selection.hasFormat("underline"))
      setIsStrikethrough(selection.hasFormat("strikethrough"))
      setIsInlineCode(selection.hasFormat("code"))
    }
  }, [])

  useEffect(() => {
    return mergeRegister(
      editor.registerUpdateListener(({ editorState }) => {
        editorState.read(() => {
          $updateToolbar()
        })
      }),
      editor.registerCommand(
        SELECTION_CHANGE_COMMAND,
        () => {
          $updateToolbar()
          return false
        },
        LowPriority
      ),
      editor.registerCommand(
        CAN_UNDO_COMMAND,
        (payload) => {
          setCanUndo(payload)
          return false
        },
        LowPriority
      ),
      editor.registerCommand(
        CAN_REDO_COMMAND,
        (payload) => {
          setCanRedo(payload)
          return false
        },
        LowPriority
      )
    )
  }, [editor, $updateToolbar])

  return (
    <div className={toolbarClasses}>
      <ToolbarButton
        disabled={!canUndo}
        onClick={() => editor.dispatchCommand(UNDO_COMMAND, undefined)}
        aria-label="Undo"
      >
        <span>U</span>
      </ToolbarButton>
      <ToolbarButton
        disabled={!canRedo}
        onClick={() => editor.dispatchCommand(REDO_COMMAND, undefined)}
        className={itemClasses}
        aria-label="Redo"
      >
        <span>R</span>
      </ToolbarButton>
      <Divider />
      <ToolbarButton
        onClick={() => editor.dispatchCommand(FORMAT_TEXT_COMMAND, "bold")}
        active={isBold}
        aria-label="Format Bold"
      >
        <span>B</span>
      </ToolbarButton>
      <ToolbarButton
        onClick={() => editor.dispatchCommand(FORMAT_TEXT_COMMAND, "italic")}
        active={isItalic}
        aria-label="Format Italics"
      >
        <span>I</span>
      </ToolbarButton>
      <ToolbarButton
        onClick={() => editor.dispatchCommand(FORMAT_TEXT_COMMAND, "underline")}
        active={isUnderline}
        aria-label="Format Underline"
      >
        <span>U</span>
      </ToolbarButton>
      <ToolbarButton
        onClick={() => editor.dispatchCommand(FORMAT_TEXT_COMMAND, "code")}
        aria-label="Format Inline Code"
        active={isInlineCode}
      >
        <span>C</span>
      </ToolbarButton>
      <ToolbarButton
        onClick={() => editor.dispatchCommand(FORMAT_TEXT_COMMAND, "strikethrough")}
        active={isStrikethrough}
        aria-label="Format Strikethrough"
      >
        <span>ST</span>
      </ToolbarButton>
      <Divider />
      <ToolbarButton
        onClick={() => editor.dispatchCommand(INSERT_CUSTOM_PARAGRAPH_COMMAND, undefined)}
        aria-label="Insert custom paragraph"
      >
        <span>CP</span>
      </ToolbarButton>
      <Divider />
      <ToolbarButton onClick={() => editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, "left")} aria-label="Left Align">
        <span>LA</span>
      </ToolbarButton>
      <ToolbarButton onClick={() => editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, "center")} aria-label="Center Align">
        <span>CA</span>
      </ToolbarButton>
      <ToolbarButton onClick={() => editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, "right")} aria-label="Right Align">
        <span>RA</span>
      </ToolbarButton>
      <ToolbarButton
        aria-label="Justify Align"
        onClick={() => editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, "justify")}
      >
        <span>JA</span>
      </ToolbarButton>
    </div>
  )
}

export default ToolbarPlugin

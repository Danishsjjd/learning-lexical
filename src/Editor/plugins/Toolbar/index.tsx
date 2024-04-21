import { mergeRegister } from "@lexical/utils"
import {
  $getSelection,
  $isRangeSelection,
  CAN_REDO_COMMAND,
  CAN_UNDO_COMMAND,
  FORMAT_ELEMENT_COMMAND,
  FORMAT_TEXT_COMMAND,
  LexicalEditor,
  REDO_COMMAND,
  SELECTION_CHANGE_COMMAND,
  UNDO_COMMAND,
} from "lexical"
import { ComponentPropsWithoutRef, useCallback, useEffect, useRef, useState } from "react"
import { useActiveEditor } from "../../context/EditorProvider"

const LowPriority = 1

function Divider() {
  return <div className="mx-1 w-px self-stretch bg-neutral-200" />
}

export default function ToolbarPlugin() {
  const editor = useActiveEditor()

  if (!editor) return null
  return <ToolbarPluginProvider editor={editor} />
}
const itemClasses =
    "rounded-lg border-0 bg-none p-2 text-sm opacity-60 disabled:opacity-20 disabled:cursor-not-allowed [&>span]:flex [&>span]:aspect-square [&>span]:size-6 [&>span]:items-center [&>span]:justify-center",
  spacedClasses = "mr-0.5",
  activeClasses = "bg-gray-300"

function ToolbarPluginProvider({ editor }: { editor: LexicalEditor }) {
  const toolbarRef = useRef(null)
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
    <div
      className="sticky top-0 z-50 mb-1 flex items-center justify-center rounded-tl-lg rounded-tr-lg bg-white p-1"
      ref={toolbarRef}
    >
      <Button disabled={!canUndo} onClick={() => editor.dispatchCommand(UNDO_COMMAND, undefined)} aria-label="Undo">
        <span>U</span>
      </Button>
      <Button
        disabled={!canRedo}
        onClick={() => editor.dispatchCommand(REDO_COMMAND, undefined)}
        className={itemClasses}
        aria-label="Redo"
      >
        <span>R</span>
      </Button>
      <Divider />
      <Button
        onClick={() => editor.dispatchCommand(FORMAT_TEXT_COMMAND, "bold")}
        active={isBold}
        aria-label="Format Bold"
      >
        <span>B</span>
      </Button>
      <Button
        onClick={() => editor.dispatchCommand(FORMAT_TEXT_COMMAND, "italic")}
        active={isItalic}
        aria-label="Format Italics"
      >
        <span>I</span>
      </Button>
      <Button
        onClick={() => editor.dispatchCommand(FORMAT_TEXT_COMMAND, "underline")}
        active={isUnderline}
        aria-label="Format Underline"
      >
        <span>U</span>
      </Button>
      <Button
        onClick={() => editor.dispatchCommand(FORMAT_TEXT_COMMAND, "code")}
        aria-label="Format Inline Code"
        active={isInlineCode}
      >
        <span>C</span>
      </Button>
      <Button
        onClick={() => editor.dispatchCommand(FORMAT_TEXT_COMMAND, "strikethrough")}
        active={isStrikethrough}
        aria-label="Format Strikethrough"
      >
        <span>ST</span>
      </Button>
      <Divider />
      <Button onClick={() => editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, "left")} aria-label="Left Align">
        <span>LA</span>
      </Button>
      <Button onClick={() => editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, "center")} aria-label="Center Align">
        <span>CA</span>
      </Button>
      <Button onClick={() => editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, "right")} aria-label="Right Align">
        <span>RA</span>
      </Button>
      <Button aria-label="Justify Align" onClick={() => editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, "justify")}>
        <span>JA</span>
      </Button>
    </div>
  )
}

const Button = ({ className, active, ...props }: ComponentPropsWithoutRef<"button"> & { active?: boolean }) => {
  return <button className={`${itemClasses} ${spacedClasses} ${active ? activeClasses : ""} ${className}`} {...props} />
}

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
import { useCallback, useEffect, useRef, useState } from "react"
import { useActiveEditor } from "../context/EditorProvider"

const LowPriority = 1

function Divider() {
  return <div className="mx-1 w-px self-stretch bg-neutral-200" />
}

export default function ToolbarPlugin() {
  const editor = useActiveEditor()

  console.log(editor?._rootElement)

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
    <div className="mb-1 flex items-center justify-center rounded-tl-lg rounded-tr-lg bg-white p-1" ref={toolbarRef}>
      <button
        disabled={!canUndo}
        onClick={() => {
          editor.dispatchCommand(UNDO_COMMAND, undefined)
        }}
        className={`${itemClasses} ${spacedClasses}`}
        aria-label="Undo"
      >
        <span>U</span>
      </button>
      <button
        disabled={!canRedo}
        onClick={() => {
          editor.dispatchCommand(REDO_COMMAND, undefined)
        }}
        className={itemClasses}
        aria-label="Redo"
      >
        <span>R</span>
      </button>
      <Divider />
      <button
        onClick={() => {
          editor.dispatchCommand(FORMAT_TEXT_COMMAND, "bold")
        }}
        className={`${itemClasses} ${spacedClasses} ` + (isBold ? activeClasses : "")}
        aria-label="Format Bold"
      >
        <span>B</span>
      </button>
      <button
        onClick={() => {
          editor.dispatchCommand(FORMAT_TEXT_COMMAND, "italic")
        }}
        className={`${itemClasses} ${spacedClasses} ` + (isItalic ? activeClasses : "")}
        aria-label="Format Italics"
      >
        <span>I</span>
      </button>
      <button
        onClick={() => {
          editor.dispatchCommand(FORMAT_TEXT_COMMAND, "underline")
        }}
        className={`${itemClasses} ${spacedClasses} ` + (isUnderline ? activeClasses : "")}
        aria-label="Format Underline"
      >
        <span>U</span>
      </button>
      <button
        onClick={() => {
          editor.dispatchCommand(FORMAT_TEXT_COMMAND, "strikethrough")
        }}
        className={`${itemClasses} ${spacedClasses} ` + (isStrikethrough ? activeClasses : "")}
        aria-label="Format Strikethrough"
      >
        <span>ST</span>
      </button>
      <Divider />
      <button
        onClick={() => {
          editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, "left")
        }}
        className={`${itemClasses} ${spacedClasses}`}
        aria-label="Left Align"
      >
        <span>LA</span>
      </button>
      <button
        onClick={() => {
          editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, "center")
        }}
        className={`${itemClasses} ${spacedClasses}`}
        aria-label="Center Align"
      >
        <span>CA</span>
      </button>
      <button
        onClick={() => {
          editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, "right")
        }}
        className={`${itemClasses} ${spacedClasses}`}
        aria-label="Right Align"
      >
        <span>RA</span>
      </button>
      <button
        onClick={() => {
          editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, "justify")
        }}
        className={itemClasses}
        aria-label="Justify Align"
      >
        <span>JA</span>
      </button>
    </div>
  )
}

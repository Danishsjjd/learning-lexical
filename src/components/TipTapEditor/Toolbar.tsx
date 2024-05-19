import { useCurrentEditor } from "@tiptap/react"
import { toolbarClasses } from "../../data"
import Divider from "../Divider"
import ToolbarButton, { itemClasses } from "../ToolbarButton"

const ToolBar = () => {
  const { editor } = useCurrentEditor()

  if (!editor) {
    return null
  }

  return (
    <>
      <div className={toolbarClasses}>
        <ToolbarButton
          disabled={!editor.can().chain().focus().undo().run()}
          onClick={() => editor.chain().focus().redo().run()}
          aria-label="Undo"
        >
          <span>U</span>
        </ToolbarButton>
        <ToolbarButton
          disabled={!editor.can().chain().focus().redo().run()}
          onClick={() => editor.chain().focus().redo().run()}
          className={itemClasses}
          aria-label="Redo"
        >
          <span>R</span>
        </ToolbarButton>
        <Divider />
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleBold().run()}
          disabled={!editor.can().chain().focus().toggleBold().run()}
          active={editor.isActive("bold")}
          aria-label="Format Bold"
        >
          <span>B</span>
        </ToolbarButton>
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleItalic().run()}
          disabled={!editor.can().chain().focus().toggleItalic().run()}
          active={editor.isActive("italic")}
          aria-label="Format Italics"
        >
          <span>I</span>
        </ToolbarButton>
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleUnderline().run()}
          disabled={!editor.can().chain().focus().toggleUnderline().run()}
          active={editor.isActive("underline")}
          aria-label="Format Underline"
        >
          <span>U</span>
        </ToolbarButton>
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleCode().run()}
          disabled={!editor.can().chain().focus().toggleCode().run()}
          active={editor.isActive("code")}
          aria-label="Format Inline Code"
        >
          <span>C</span>
        </ToolbarButton>
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleStrike().run()}
          disabled={!editor.can().chain().focus().toggleStrike().run()}
          active={editor.isActive("strike")}
          aria-label="Format Strike"
        >
          <span>ST</span>
        </ToolbarButton>
        <ToolbarButton
          onClick={() => editor.chain().focus().setColor("#958DF1").run()}
          active={editor.isActive("textStyle", { color: "#958DF1" })}
        >
          Purple
        </ToolbarButton>
        <Divider />
        {/* <ToolbarButton
          onClick={() => editor.dispatchCommand(INSERT_CUSTOM_PARAGRAPH_COMMAND, undefined)}
          aria-label="Insert custom paragraph"
        >
          <span>CP</span>
        </ToolbarButton> */}

        {/* 
        <ToolbarButton onClick={() => editor.chain().focus().} aria-label="Left Align">
          <span>LA</span>
        </ToolbarButton>
        <ToolbarButton
          onClick={() => editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, "center")}
          aria-label="Center Align"
        >
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
        </ToolbarButton> */}
      </div>
    </>
  )
}

export default ToolBar

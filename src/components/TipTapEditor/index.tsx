import { Color } from "@tiptap/extension-color"
import { Underline } from "@tiptap/extension-underline"
import { EditorProvider } from "@tiptap/react"
import { StarterKit } from "@tiptap/starter-kit"
import { containerClasses, sectionClasses } from "../../data"
import TextStyle from "@tiptap/extension-text-style"
import ToolBar from "./Toolbar"

const content = "Hello World!"

const TiptapEditor = () => {
  return (
    <section className={sectionClasses}>
      <EditorProvider
        slotBefore={<ToolBar />}
        extensions={[StarterKit, Underline, Color.configure({ types: [TextStyle.name] }), TextStyle]}
        content={content}
        editorProps={{ attributes: { class: containerClasses } }}
      />
    </section>
  )
}

export default TiptapEditor

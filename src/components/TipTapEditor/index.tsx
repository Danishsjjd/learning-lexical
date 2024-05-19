import { Color } from "@tiptap/extension-color"
import { Image as ImagePlugin } from "@tiptap/extension-image"
import TextStyle from "@tiptap/extension-text-style"
import { Underline } from "@tiptap/extension-underline"
import { Editor, EditorProvider } from "@tiptap/react"
import { StarterKit } from "@tiptap/starter-kit"
import { Markdown } from "tiptap-markdown"
import { containerClasses, sectionClasses, sections } from "../../data"
import ToolBar from "./Toolbar"
import { useState } from "react"

const TiptapEditor = () => {
  const [jsonString, setJsonString] = useState("")

  const updateJSON = (editor: Editor) => {
    const stringJSON = JSON.stringify(editor.getJSON(), null, 2)
    setJsonString(stringJSON)
  }

  return (
    <section className="mx-auto max-w-2xl overflow-hidden">
      <EditorProvider
        slotBefore={<ToolBar />}
        extensions={[
          StarterKit,
          ImagePlugin.configure({
            inline: true,
          }),
          Underline,
          Color.configure({ types: [TextStyle.name] }),
          TextStyle,
          Markdown.configure({
            html: false,
          }),
        ]}
        content={sections[0].section}
        onCreate={({ editor }) => updateJSON(editor as Editor)}
        onUpdate={({ editor }) => {
          updateJSON(editor as Editor)
          console.log(editor.storage.markdown.getMarkdown())
        }}
        editorProps={{
          attributes: { class: `${containerClasses} ${sectionClasses}` },
        }}
      />
      <div className="tree-view-output">
        <pre>{jsonString}</pre>
      </div>
    </section>
  )
}

export default TiptapEditor

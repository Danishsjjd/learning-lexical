import { Color } from "@tiptap/extension-color"
import { Underline } from "@tiptap/extension-underline"
import { EditorProvider } from "@tiptap/react"
import { StarterKit } from "@tiptap/starter-kit"
import { containerClasses, sectionClasses, sections } from "../../data"
import TextStyle from "@tiptap/extension-text-style"
import ToolBar from "./Toolbar"
import { Markdown } from "tiptap-markdown"
import { Image as ImagePlugin } from "@tiptap/extension-image"

const TiptapEditor = () => {
  return (
    <section>
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
          Markdown,
        ]}
        content={sections[0].section}
        onUpdate={({ editor }) => {
          console.log(editor.storage.markdown.getMarkdown())
        }}
        editorProps={{
          attributes: { class: `${containerClasses} ${sectionClasses}` },
        }}
      />
    </section>
  )
}

export default TiptapEditor

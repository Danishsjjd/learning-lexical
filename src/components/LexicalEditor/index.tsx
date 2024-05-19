import { $convertToMarkdownString, HEADING } from "@lexical/markdown"
import { LexicalComposer, type InitialConfigType } from "@lexical/react/LexicalComposer"
import { ContentEditable } from "@lexical/react/LexicalContentEditable"
import LexicalErrorBoundary from "@lexical/react/LexicalErrorBoundary"
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin"
import { MarkdownShortcutPlugin } from "@lexical/react/LexicalMarkdownShortcutPlugin"
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin"
import { HeadingNode } from "@lexical/rich-text"
import { $createParagraphNode, $createTextNode, $getRoot } from "lexical"
import { ReactCustomParagraphPlugin } from "./plugins/CustomParagraph/ReactCustomParagraph"
import CustomParagraphNode from "./plugins/CustomParagraph/node"
import ToolbarPlugin from "./plugins/Toolbar"
import TreeViewPlugin from "./plugins/TreeViewPlugin"
import { $createUnremovableHeading, UnremovableHeadingNode } from "./plugins/UnremovableHeading/node"
import { EmojiNode } from "./plugins/emoji/EmojiNode"
import { ReactEmojiPlugin } from "./plugins/emoji/ReactEmojiPlugin"
import editorTheme from "./theme"
import { containerClasses, sectionClasses } from "../../data"

const config: InitialConfigType = {
  namespace: "Lexical markdown editor",
  onError: (e) => {
    // TODO: handle error
    console.error("error:", e)
  },
  theme: editorTheme,
  nodes: [HeadingNode, UnremovableHeadingNode, CustomParagraphNode, EmojiNode],
  editorState() {
    const root = $getRoot()

    if (root.getFirstChild() !== null) return

    const heading = $createUnremovableHeading("h2")
    heading.append($createTextNode("Welcome to the Vanilla JS Lexical Demo!"))
    root.append(heading)

    const paragraph = $createParagraphNode()
    paragraph.append(
      $createTextNode("This is a demo environment built with "),
      $createTextNode("lexical").toggleFormat("code"),
      $createTextNode("."),
      $createTextNode(" Try typing in "),
      $createTextNode("some text").toggleFormat("bold"),
      $createTextNode(" with "),
      $createTextNode("different").toggleFormat("italic"),
      $createTextNode(" formats.")
    )

    root.append(paragraph)

    console.log($convertToMarkdownString())
  },
}

const LexicalEditor = () => {
  return (
    <LexicalComposer initialConfig={config}>
      <ToolbarPlugin />

      <section className={sectionClasses}>
        <RichTextPlugin
          contentEditable={<ContentEditable className={containerClasses} />}
          placeholder={
            <div className="absolute left-3 top-4 overflow-hidden text-gray-400">Enter some rich text...</div>
          }
          ErrorBoundary={LexicalErrorBoundary}
        />
        <TreeViewPlugin />
        <MarkdownShortcutPlugin transformers={[HEADING]} />
        <HistoryPlugin />
      </section>

      <ReactEmojiPlugin />
      <ReactCustomParagraphPlugin />
    </LexicalComposer>
  )
}

export default LexicalEditor

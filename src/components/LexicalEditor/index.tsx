import { $convertFromMarkdownString, HEADING } from "@lexical/markdown"
import { LexicalComposer, type InitialConfigType } from "@lexical/react/LexicalComposer"
import { ContentEditable } from "@lexical/react/LexicalContentEditable"
import LexicalErrorBoundary from "@lexical/react/LexicalErrorBoundary"
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin"
import { MarkdownShortcutPlugin } from "@lexical/react/LexicalMarkdownShortcutPlugin"
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin"
import { HeadingNode } from "@lexical/rich-text"
import { containerClasses, sectionClasses, sections } from "../../data"
import { ReactCustomParagraphPlugin } from "./plugins/CustomParagraph/ReactCustomParagraph"
import CustomParagraphNode from "./plugins/CustomParagraph/node"
import ToolbarPlugin from "./plugins/Toolbar"
import TreeViewPlugin from "./plugins/TreeViewPlugin"
import { UnremovableHeadingNode } from "./plugins/UnremovableHeading/node"
import { EmojiNode } from "./plugins/emoji/EmojiNode"
import { ReactEmojiPlugin } from "./plugins/emoji/ReactEmojiPlugin"
import editorTheme from "./theme"

const config: InitialConfigType = {
  namespace: "Lexical markdown editor",
  onError: (e) => {
    // TODO: handle error
    console.error("error:", e)
  },
  theme: editorTheme,
  nodes: [HeadingNode, UnremovableHeadingNode, CustomParagraphNode, EmojiNode],
  editorState() {
    $convertFromMarkdownString(sections[0].section)
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

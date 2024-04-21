import { LexicalComposer, type InitialConfigType } from "@lexical/react/LexicalComposer"
import { ContentEditable } from "@lexical/react/LexicalContentEditable"
import LexicalErrorBoundary from "@lexical/react/LexicalErrorBoundary"
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin"
import { $createParagraphNode, $createTextNode, $getRoot } from "lexical"
import { MultipleEditorStorePlugin } from "./plugins/MultipleEditorStore"
import TreeViewPlugin from "./plugins/TreeViewPlugin"
import { EmojiNode } from "./plugins/emoji/EmojiNode"
import { ReactEmojiSetup } from "./plugins/emoji/ReactEmojiSetup"
import editorTheme from "./theme"

const config: InitialConfigType = {
  namespace: "Lexical markdown editor",
  onError: (e) => {
    // TODO: handle error
    console.error(e)
  },
  theme: editorTheme,
  nodes: [EmojiNode],
  editorState() {
    const root = $getRoot()

    if (root.getFirstChild() !== null) return

    // const heading = $createHeadingNode("h1")
    // heading.append($createTextNode("Welcome to the Vanilla JS Lexical Demo!"))
    // root.append(heading)
    // const quote = $createQuoteNode()
    // quote.append(
    //   $createTextNode(
    //     `In case you were wondering what the text area at the bottom is – it's the debug view, showing the current state of the editor. `
    //   )
    // )
    // root.append(quote)

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
  },
}

const Editor = ({ id }: { id: string }) => {
  return (
    <LexicalComposer initialConfig={config}>
      <section className="relative mx-auto my-6 max-w-2xl overflow-hidden rounded-xl border">
        <RichTextPlugin
          contentEditable={<ContentEditable className="prose w-full max-w-2xl rounded-tl-xl rounded-tr-xl px-3 py-4" />}
          placeholder={
            <div className="absolute left-3 top-4 overflow-hidden text-gray-400">Enter some rich text...</div>
          }
          ErrorBoundary={LexicalErrorBoundary}
        />
        <TreeViewPlugin />
      </section>

      <ReactEmojiSetup />
      <MultipleEditorStorePlugin id={id} />
    </LexicalComposer>
  )
}

export default Editor

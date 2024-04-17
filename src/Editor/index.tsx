import { LexicalComposer, type InitialConfigType } from "@lexical/react/LexicalComposer"
import { ContentEditable } from "@lexical/react/LexicalContentEditable"
import LexicalErrorBoundary from "@lexical/react/LexicalErrorBoundary"
import ReactPopulateRichText from "./plugins/ReactPopulateRichText"
import { RichTextPlugin } from "./plugins/ReactRichTextPlugin"
import editorTheme from "./theme"

const config: InitialConfigType = {
  namespace: "Lexical markdown editor",
  onError: (e) => {
    // TODO: handle error
    console.error(e)
  },
  theme: editorTheme,
}

const Editor = () => {
  return (
    <LexicalComposer initialConfig={config}>
      <ReactPopulateRichText />
      <section className="max-w-2xl mx-auto my-6 rounded-xl border relative overflow-hidden">
        <RichTextPlugin
          contentEditable={<ContentEditable className="py-4 px-3 rounded-xl prose" />}
          placeholder={
            <div className="text-gray-400 overflow-hidden absolute top-4 left-3">Enter some rich text...</div>
          }
          ErrorBoundary={LexicalErrorBoundary}
        />
      </section>
    </LexicalComposer>
  )
}

export default Editor

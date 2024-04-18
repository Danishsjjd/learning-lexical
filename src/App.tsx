import Editor from "./Editor"
import { EditorProvider } from "./Editor/context/EditorProvider"
import ToolbarPlugin from "./Editor/plugins/ReactToolbar"

const App = () => {
  return (
    <EditorProvider>
      <ToolbarPlugin />
      <Editor id="1" />
      <Editor id="2" />
    </EditorProvider>
  )
}

export default App

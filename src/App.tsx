import Editor from "./Editor"
import { EditorProvider } from "./Editor/context/EditorProvider"
import ToolbarPlugin from "./Editor/plugins/Toolbar"

const App = () => {
  return (
    <EditorProvider>
      <ToolbarPlugin />
      <div className="pb-10">
        <Editor id="1" />
        <Editor id="2" />
      </div>
    </EditorProvider>
  )
}

export default App

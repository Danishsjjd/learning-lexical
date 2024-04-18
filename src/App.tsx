import Editor from "./Editor"
import { EditorProvider } from "./Editor/context/EditorProvider"

const App = () => {
  return (
    <EditorProvider>
      <Editor id="1" />
      <Editor id="2" />
    </EditorProvider>
  )
}

export default App

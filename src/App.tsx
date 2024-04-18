import Editor from "./Editor"
import { EditorProvider, useEditors } from "./Editor/context/EditorProvider"

const App = () => {
  return (
    <EditorProvider>
      <ActiveEditor />
      <Editor id="1" />
      <Editor id="2" />
    </EditorProvider>
  )
}

const ActiveEditor = () => {
  const { activeEditorId: id } = useEditors()

  return <p className="text-4xl font-medium flex items-center justify-center my-5">{id}</p>
}

export default App

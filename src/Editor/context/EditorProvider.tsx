import { LexicalEditor } from "lexical"
import { Dispatch, SetStateAction, createContext, useCallback, useContext, useState } from "react"

type EditorMutations = {
  createEditor: (id: string, editor: LexicalEditor) => void
  deleteEditor: (id: string) => void
  activeEditorId: string
  setActiveEditorId: Dispatch<SetStateAction<string>>
}

type EditorMap = Record<string, LexicalEditor>

type EditorContextValue = EditorMutations & {
  editors: EditorMap
}

const EditorContext = createContext<EditorContextValue | null>(null)

export const EditorProvider = (props: React.PropsWithChildren<{}>) => {
  const [editors, setEditors] = useState<EditorMap>({})
  const [activeEditorId, setActiveEditorId] = useState("1")

  const createEditor = useCallback((id: string, editor: LexicalEditor) => {
    setEditors((editors) => {
      if (editors[id]) return editors
      return { ...editors, [id]: editor }
    })
  }, [])

  const deleteEditor = useCallback((id: string) => {
    setEditors((editors) => {
      if (!editors[id]) return editors
      const { [id]: _, ...rest } = editors
      return rest
    })
  }, [])

  return (
    <EditorContext.Provider
      value={{
        editors,
        createEditor,
        deleteEditor,
        activeEditorId,
        setActiveEditorId,
      }}
    >
      {props.children}
    </EditorContext.Provider>
  )
}

export const useEditors = (): EditorMutations => {
  const context = useContext(EditorContext)
  if (context === null) {
    throw new Error(`The \`useEditors\` hook must be used inside the <EditorProvider> component's context.`)
  }
  return context
}

export const useEditor = (id: string): LexicalEditor | null => {
  const context = useContext(EditorContext)
  if (context === null) {
    throw new Error(`The \`useEditor\` hook must be used inside the <EditorProvider> component's context.`)
  }
  return context.editors[id] || null
}

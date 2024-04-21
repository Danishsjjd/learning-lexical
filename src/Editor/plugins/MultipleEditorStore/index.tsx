import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext"
import { COMMAND_PRIORITY_CRITICAL, FOCUS_COMMAND } from "lexical"
import { useEffect } from "react"
import { useEditors } from "../../context/EditorProvider"

export type MultipleEditorStorePluginProps = {
  id: string
}

export function MultipleEditorStorePlugin({ id }: MultipleEditorStorePluginProps) {
  const [editor] = useLexicalComposerContext()
  const { createEditor, deleteEditor, setActiveEditorId } = useEditors()

  useEffect(() => {
    createEditor(id, editor)

    return () => {
      deleteEditor(id)
    }
  }, [id, editor, createEditor, deleteEditor])

  useEffect(() => {
    return editor.registerCommand(
      FOCUS_COMMAND,
      () => {
        setActiveEditorId(id)
        return false
      },
      COMMAND_PRIORITY_CRITICAL
    )
  }, [editor, id, setActiveEditorId])

  return null
}

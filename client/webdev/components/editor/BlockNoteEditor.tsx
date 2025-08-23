'use client'

import { useCreateBlockNote } from '@blocknote/react'
import { PartialBlock } from '@blocknote/core'
import { BlockNoteView } from "@blocknote/mantine"
import "@blocknote/mantine/style.css"
import "./editor.css"
import useTheme from 'next-theme'
import { useEdgeStore } from '@/lib/edgestore'



interface BlockNoteEditorProps {
    onChange?: (value: string) => void
    initialContent?: string
    editable?: boolean
}

const BlockNoteEditor = ({onChange, initialContent, editable}: BlockNoteEditorProps) => {

    const { resolvedTheme }: any = useTheme()
    const {edgestore} = useEdgeStore()

    const handleImageUpload = async (file: File) => {
        
        const res = await edgestore.publicFiles.upload({file})

        return res.url
    };

    const editor = useCreateBlockNote({
        initialContent: initialContent ? JSON.parse(initialContent) as PartialBlock[] : undefined,
        uploadFile: handleImageUpload
        
        })
        

  return (
    <BlockNoteView editor={editor} 
    theme={resolvedTheme === "dark" ? "dark" : "light"}
    onChange={onChange ? () => {onChange(JSON.stringify(editor.document))}: () => {}}
    editable={editable}
    />
  )
}

export default BlockNoteEditor


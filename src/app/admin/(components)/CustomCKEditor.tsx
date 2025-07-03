import ClassicEditor from '@ckeditor/ckeditor5-build-classic'
import { CKEditor } from '@ckeditor/ckeditor5-react'
import React, { memo } from 'react'

interface CustomCKEditorProps {
  value?: string
  onChange?: (x: string) => void
}

const CustomCKEditor = ({ value, onChange }: CustomCKEditorProps) => {
  return (
    <CKEditor
      id="description"
      editor={ClassicEditor}
      data={value}
      onChange={(event, editor) => {
        const data = editor.getData()
        onChange?.(data)
      }}
      onBlur={(editor) => {
        // console.log('Blur.', editor)
      }}
      onFocus={(editor) => {
        // console.log('Focus.', editor)
      }}
    />
  )
}

export default CustomCKEditor

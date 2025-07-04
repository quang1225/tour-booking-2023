import { CheckCircleOutline, ErrorOutline } from '@mui/icons-material'
import React from 'react'

export interface MessageI {
  messageType: 'error' | 'success'
  message: string
  className?: string
}
const Message = ({ messageType, message, className }: MessageI) => (
  <div className={`mt-1 flex items-center ${className || ''}`}>
    {messageType === 'error' ? (
      <ErrorOutline className="text-red-400" />
    ) : (
      <CheckCircleOutline className="text-green" />
    )}{' '}
    <span
      className={`text-sm font-semibold ml-1 ${
        messageType === 'error' ? 'text-red-400' : 'text-green'
      }`}
    >
      {message}
    </span>
  </div>
)

export default Message

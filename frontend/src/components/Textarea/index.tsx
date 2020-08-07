
import React, { TextareaHTMLAttributes } from 'react'

interface Props extends TextareaHTMLAttributes<HTMLTextAreaElement> {
   label: string
   name: string
}

const Textarea: React.FC<Props> = ({ label, name, ...rest }) => {
   return (
      <div className="textarea-block">
         <label htmlFor={name}>{label}</label>
         <textarea id={name} {...rest} />
      </div>
   )
}

export default Textarea

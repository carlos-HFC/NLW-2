
import React, { SelectHTMLAttributes } from 'react'

interface Props extends SelectHTMLAttributes<HTMLSelectElement> {
   label: string
   name: string
   options: Array<{
      value: string
      label: string
   }>
}

const Select: React.FC<Props> = ({ options, label, name, ...rest }) => {
   return (
      <div className="select-block">
         <label htmlFor={name}>{label}</label>
         <select value="" id={name} {...rest}>
            <option value="" disabled hidden>Selecione uma opção</option>
            {options.map((option, i) => (
               <option key={i} value={option.value}>{option.label}</option>
            ))}
         </select>
      </div>
   )
}

export default Select

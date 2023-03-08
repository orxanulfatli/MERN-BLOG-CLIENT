import React from 'react'

type TextErrorsProps = {
    error:string|undefined
}
const TextErrors:React.FC<TextErrorsProps> = ({error}) => {
  return (
      <div style={{color:'red'}}>{error }</div>
  )
}

export default TextErrors
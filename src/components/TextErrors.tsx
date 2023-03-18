import React from 'react'

type TextErrorsProps = {
    error:string|undefined
}
const TextErrors:React.FC<TextErrorsProps> = ({error}) => {
  return (
      <div style={{color:'red',padding:'10px'}}>{error }</div>
  )
}

export default TextErrors
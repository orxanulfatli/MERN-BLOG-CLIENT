import { useState } from "react"

export const usePasswordToggle = () => {
    const [visible, setVisible] = useState(false)
    // const Icon = (
    //   <i className={`bi ${visible ? "bi-eye" : "bi-eye-slash"}`}> </i>
    // );
    const inputType = visible ? 'text' : 'password'
    
  return { inputType, visible, setVisible }
}
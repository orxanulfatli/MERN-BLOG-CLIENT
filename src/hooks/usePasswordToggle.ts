import { useState,SetStateAction,Dispatch } from "react"

export const usePasswordToggle = (): [string, boolean, Dispatch<SetStateAction<boolean>>] => {
  const [visible, setVisible] = useState(false)
  // const Icon = (
  //   <i className={`bi ${visible ? "bi-eye" : "bi-eye-slash"}`}> </i>
  // );
  const inputType = visible ? 'text' : 'password'
    
  return [inputType, visible, setVisible ]
}
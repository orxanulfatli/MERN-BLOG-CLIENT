import { useEffect, useState } from "react"
import { useAppDispatch } from "../hooks/redux"
import { checkAuthAC } from "../Global/auth/action";
import { Outlet } from "react-router-dom";

const PersistLogin = () => {
    const dispatch = useAppDispatch()
    const [loading,setloading] = useState(true)
    useEffect(() => {
        if (localStorage.getItem('loggin')) {
           dispatch(checkAuthAC()).finally(()=>setloading(false))
        } else {
            setloading(false)
        }
    },[dispatch])
    return (
      <div>
        {loading ? <></>: <Outlet />}
      </div>
    );
}

export default PersistLogin
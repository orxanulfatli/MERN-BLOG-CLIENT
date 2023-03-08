import React from 'react'
import { useAppSelector } from '../../hooks/redux';
import Loading from './Loading'

//alerti bashqa cur ishlemishem axira kimi ishliyib toast da yaratmaq olar
const Alert = () => {
      const { isLoading } = useAppSelector(
        (state) => state.alertReducer
      );
  return (
      <div>
          {isLoading && <Loading />}
     </div>
  )
}

export default Alert
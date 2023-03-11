import './Alert.css'
import { useAppSelector } from '../../hooks/redux';
import Loading from './Loading'

//alerti bashqa cur ishlemishem axira kimi ishliyib toast da yaratmaq olar
export const Alert = () => {
      const { isLoading } = useAppSelector(
        (state) => state.alertReducer
      );
  return (
      <div>
          {isLoading && <Loading />}
     </div>
  )
}


export const showErrMsg = (msg: string) => {
  return <div className="errMsg">{msg}</div>;
};

export const showSuccessMsg = (msg: string) => {
  return <div className="successMsg">{msg}</div>;
};
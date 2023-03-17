import './Alert.css'
import { useAppSelector } from '../../hooks/redux';
import Loading from './Loading'
import Toast from './Toast';

export const Alert = () => {
      const { isLoading,error,message } = useAppSelector(
        (state) => state.alertReducer
      );
  return (
    <div>
      {isLoading && <Loading />}
      {error && (
        <Toast title="Errors" body={error} bgColor="bg-danger" />
      )}

      {message && (
        <Toast title="Success" body={message} bgColor="bg-success" />
      )}
    </div>
  );
}


export const showErrMsg = (msg: string) => {
  return <div className="errMsg">{msg}</div>;
};

export const showSuccessMsg = (msg: string) => {
  return <div className="successMsg">{msg}</div>;
};
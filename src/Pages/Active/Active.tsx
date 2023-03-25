import  { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { showErrMsg, showSuccessMsg } from "../../components/alert/Alert";
import { IParams } from "../../models/Params";
import { activateAccount } from "../../services/authService";

const Active = () => {
    const { activeToken } = useParams<IParams>();
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    


    useEffect(() => {
      if (activeToken) {
        activateAccount({ activeToken })
          .then((res) => setSuccess(res.data.message))
          .catch((err) => setError(err.response.data.message));
        console.log("render");
      }
    }, [activeToken]);

    return (
      <div>
        {error && showErrMsg(error)}
        {success && showSuccessMsg(success)}
      </div>
    );
};

export default Active;

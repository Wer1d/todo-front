import { useEffect } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";

export default function SignOut() {
    let [cookies, removeCookie] = useCookies(['token']);
    let navigate = useNavigate();
    useEffect(() => { // re render
        removeCookie('token');
        navigate('/signin');
    }, []);
    return <div>hi</div>;
}
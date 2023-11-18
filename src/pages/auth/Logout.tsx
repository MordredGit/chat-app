import React, { useEffect } from "react";
import { useDispatch } from "../../redux/store";
import { LogOutUser } from "../../redux/slices/auth";
import { Link, useNavigate } from "react-router-dom";

const Logout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(LogOutUser())
      .then(() => navigate("/auth/login"))
      .catch((err: any) => console.log(err));
  }, [dispatch, navigate]);
  return (
    <div>
      Logged out <Link to={"/auth/login"}>Log in again</Link>
    </div>
  );
};

export default Logout;

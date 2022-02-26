import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import { getEmployee } from "../../Action";

const UserComponent = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const {
    userReducer: { getEmpData },
  } = useSelector((state) => state);
  useEffect(() => {
    dispatch(getEmployee(id));
  }, [id, dispatch]);

  return (
    <>
      <div>
      <Link to={".."}>BACK</Link>
        <h2>{getEmpData?.first_name}</h2>
        {getEmpData?.email}
        <br />
        {getEmpData?.age}
        <br />
        {getEmpData?.status}
        <br />
      </div>
    </>
  );
};

export default UserComponent;

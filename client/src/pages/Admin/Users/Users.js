import React, { useState, useEffect } from "react";
import { Button} from "antd";
import { getAccessTokenApi } from "../../../api/auth";
import { getUsersApi } from "../../../api/admin";
import ListUsers from "../../../components/Admin/ListUsers";

import "./Users.scss";

export default function Users() {
  const [ users, setUsers] = useState([]);
  const [ reloadUsers, setReloadUsers ] = useState(false);
  const token = getAccessTokenApi();

  useEffect( () => {
    getUsersApi(token).then(response => {
      setUsers(response.users);
    });
    setReloadUsers(false);
  }, [token, reloadUsers]);
  
  return (
    <>
      <ListUsers users={users} setReloadUsers={setReloadUsers} />
    </>
  );
}
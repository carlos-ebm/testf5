import React from "react";
import { Card } from "antd";
import RegisterForm from "../../../components/Admin/RegisterForm";

import "./UserAdd.scss";

export default function UserAdd() {

  return (
    <Card className="user-add__card">
      <RegisterForm/>
    </Card>
  );
}




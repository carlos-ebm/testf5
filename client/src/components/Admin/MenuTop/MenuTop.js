import React from "react";
import { Button, Menu } from "antd";
import { Link, withRouter } from "react-router-dom";
import { LogoutOutlined } from "@ant-design/icons";
import {
  PoweroffOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  MenuOutlined,
} from "@ant-design/icons";
import Logo from "../../../assets/img/png/LogoProvisorio.png";

import "./MenuTop.scss";
import { logout } from "../../../api/auth";

function MenuTop(props) {
  const {location} = props;

  function logoutAdmin(){
    logout();
    window.location.reload();
  }

  return (
    <>
    <Menu
      className="menu-top"
      //theme="light"
      mode="horizontal" defaultSelectedKeys={[location.pathname]}
    >
      <Menu.Item  className="menu-top__item" key="/admin/profile">
        Perfil <Link to="/admin/profile" />
      </Menu.Item>
      <Menu.Item className="menu-top__item" key="/admin/publications">
        Publicaciones <Link to="/admin/publications" />
      </Menu.Item>
      <Menu.Item className="menu-top__item" key="/admin/programs">
        Programas <Link to="/admin/programs" />
      </Menu.Item>
      <Menu.Item className="menu-top__item" key="/admin/users">
        Usuarios <Link to="/admin/users" />
      </Menu.Item>
      <Menu.Item className="menu-top__item" key="/admin/publicities">
        Publicidad <Link to="/admin/publicities" />
      </Menu.Item>
         <Button type="link" className="menu-top__button-logout" onClick={logoutAdmin}><LogoutOutlined />Salir</Button>
    </Menu>
    </>
  );
}

export default withRouter(MenuTop);
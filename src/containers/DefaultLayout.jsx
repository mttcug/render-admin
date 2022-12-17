import React, { useState, useEffect } from "react";
import {
  Route,
  Routes,
  Navigate,
  useLocation,
  useNavigate,
  useRoutes
} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { menuToggleAction } from "@/store/reducer.js";
import { Layout, BackTop, message } from "antd";
import avatorImg from "@/assets/images/user.jpg";
import { viewRoutes } from "@/routes";
import menuConf from "./menu";
import "@/style/layout.scss";

import AppHeader from "./AppHeader.jsx";
import AppAside from "./AppAside.jsx";
import AppFooter from "./AppFooter.jsx";

const { Content } = Layout;

const DefaultLayout = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const menuToggle = useSelector(state => state.menuToggle);
  const dispatch = useDispatch();

  const [avatar, setAvatar] = useState(avatorImg);
  const [show, setShow] = useState(true);
  const [menu, setMenu] = useState({});

  let { auth } = JSON.parse(localStorage.getItem("user"))
    ? JSON.parse(localStorage.getItem("user"))
    : "";

  const isLogin = () => {
    if (!localStorage.getItem("user")) {
      navigate("/login");
    } else {
      setMenu(getMenu(menuConf));
    }
  };

  const loginOut = () => {
    localStorage.clear();
    navigate("/login");
    message.success("登出成功!");
  };

  const getMenu = menu => {
    let newMenu,
      auth = JSON.parse(localStorage.getItem("user")).auth;
    if (!auth) {
      return menu;
    } else {
      Object.keys(menu).map(key => {
        const res = menu[key];
        if (res.auth && res.auth.indexOf(auth) !== -1) {
          newMenu[key] = res;
        }
      });
      return newMenu;
    }
  };

  useEffect(() => {
    isLogin();
  }, []);

  useEffect(() => {
    return () => {};
  }, [pathname]);

  return (
    <Layout className="app">
      <BackTop />
      <AppAside menuToggle={menuToggle} menu={menu} />
      <Layout
        style={{
          marginLeft: menuToggle ? "80px" : "200px",
          minHeight: "100vh"
        }}
      >
        <AppHeader
          menuToggle={menuToggle}
          menuClick={() => {
            dispatch(menuToggleAction);
          }}
          avatar={avatar}
          show={show}
          loginOut={loginOut}
        />
        <Content className="content">{useRoutes(viewRoutes)}</Content>
        <AppFooter />
      </Layout>
    </Layout>
  );
};

export default DefaultLayout;

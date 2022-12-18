import React, { Component, useState, useEffect } from "react";
import { Layout, Row, Avatar, Card, Image, Space } from "antd";
import {
  EditOutlined,
  DeleteOutlined,
  FileDoneOutlined,
  PlusCircleOutlined
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import screenfull from "screenfull";
import "@/style/view-style/index.scss";
import { createTypes, applicationsTypeImg } from "./config.js";

const Entry = props => {
  const navigate = useNavigate();

  const create = url => {
    navigate(url);
  };
  return (
    <section className="create-entry">
      <p className="section-title">创建新应用</p>
      <Row className="index-header">
        <Space size={"large"}>
          {createTypes.map(item => (
            <Card
              key={item.type}
              style={{
                width: 300
              }}
              className="card"
              hoverable={true}
              actions={[]}
            >
              <div
                className="card-header"
                onClick={() => {
                  create(item.link);
                }}
              >
                <PlusCircleOutlined
                  style={{
                    fontSize: 30,
                    color: "#006eff",
                    marginRight: 10,
                    verticalAlign: "center"
                  }}
                />
                <p className="title">{item.title}</p>
              </div>
              <div className="card-content">{item.desc}</div>
              <Image rootClassName="card-img" width={150} src={item.pic} />
            </Card>
          ))}
        </Space>
      </Row>
    </section>
  );
};

const AppList = props => {
  const navigate = useNavigate();
  const { Meta } = Card;
  const [applications, setApplications] = useState([]);

  useEffect(() => {
    // 获取App信息
    const apps = JSON.parse(sessionStorage.getItem("app") || "[]");
    setApplications(apps);
  }, []);

  const linkTo = url => {
    navigate(url);
  };

  return applications.length ? (
    <section className="application-list">
      <p className="section-title">我的应用</p>
      <Row className="index-header" wrap="true">
        <Space size={"large"}>
          {applications.map(app => (
            <Card
              key={app.appId}
              style={{
                width: 300
              }}
              cover={
                <img
                  alt="example"
                  src={
                    applicationsTypeImg[
                      (app.appType && app.appType.toLocaleUpperCase()) || "FORM"
                    ]
                  }
                />
              }
              hoverable={true}
              actions={[
                <FileDoneOutlined
                  onClick={() => {
                    linkTo(`/createApp/AppContent?appId=${app.appId}`);
                  }}
                />,
                <EditOutlined
                  key="edit"
                  onClick={() => {
                    linkTo(`/createApp/appBuild?appId=${app.appId}`);
                  }}
                />,
                <DeleteOutlined />
              ]}
            >
              <Meta
                avatar={<Avatar src="https://joeschmoe.io/api/v1/random" />}
                title={app.appName}
                description={app.desc}
              />
            </Card>
          ))}
        </Space>
      </Row>
    </section>
  ) : null;
};

class Index extends Component {
  fullToggle = () => {
    if (screenfull.isEnabled) {
      screenfull.request(document.getElementById("bar"));
    }
  };
  render() {
    return (
      <Layout className="index animated fadeIn">
        <Entry {...this.props} />
        <AppList {...this.props} />
      </Layout>
    );
  }
}

export default Index;

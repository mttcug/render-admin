import React, { useState, useEffect } from "react";
import {
  EditOutlined,
  DeleteOutlined,
  FileDoneOutlined
} from "@ant-design/icons";
import { Space, Card, Skeleton } from "antd";
import "./index.scss";
import img404 from "@/assets/images/404.jpg";

const Applications = props => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(false);
  }, []);

  const linkTo = url => {
    props.history.replace(url);
  };

  return (
    <Space>
      {props.applications.map(app => {
        return (
          <div key={app.appId} className="site-card-border-less-wrapper">
            <Card
              title={app.appName}
              style={{ width: 300, marginTop: 16 }}
              actions={[
                <FileDoneOutlined
                  onClick={() => {
                    linkTo(`/createApp/AppContent?appId=${app.appId}`);
                  }}
                />,
                <EditOutlined
                  key="edit"
                  onClick={() => {
                    linkTo(`/createApp/appBuild?type=edit&appId=${app.appId}`);
                  }}
                />,
                <DeleteOutlined />
              ]}
            >
              <Skeleton loading={loading} avatar active>
                <p>应用Id：{app.appId}</p>
                <p>创建人：{app.creator}</p>
                <p>应用简介：{app.desc}</p>
              </Skeleton>
            </Card>
          </div>
        );
      })}
    </Space>
  );
};

export default props => {
  const [applications, setApplications] = useState([]);

  useEffect(() => {
    // 获取App信息
    const apps = JSON.parse(sessionStorage.getItem("app") || "[]");
    setApplications(apps);
  }, []);

  return (
    <div className="application-container">
      {applications.length ? (
        <Applications applications={applications} {...props} />
      ) : (
        <div style={{ textAlign: "center", marginTop: "5rem" }}>
          <img src={img404} alt="" />
        </div>
      )}
    </div>
  );
};

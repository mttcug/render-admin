import React, { useState, useEffect } from "react";
import {
  EditOutlined,
  DeleteOutlined,
  FileDoneOutlined
} from "@ant-design/icons";
import { Space, Card, Skeleton, Avatar } from "antd";
import "./index.scss";
import img404 from "@/assets/images/404.jpg";

const Applications = props => {
  const { Meta } = Card;
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
              style={{ width: 300, marginTop: 16 }}
              cover={
                <img
                  alt="example"
                  src="https://qcloudimg.tencent-cloud.cn/raw/297010834f5c77317a1ec0f9ea865031.png"
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
                    linkTo(`/createApp/appBuild?type=edit&appId=${app.appId}`);
                  }}
                />,
                <DeleteOutlined />
              ]}
            >
              <Meta
                avatar={<Avatar src="https://joeschmoe.io/api/v1/random" />}
                title={app.appId}
                description={app.desc}
              />
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

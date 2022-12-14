import React, { Component } from "react";
import { Layout, Row, Avatar, Card, Image, Space } from "antd";
import {
  EditOutlined,
  DeleteOutlined,
  SettingOutlined,
  PlusCircleOutlined
} from "@ant-design/icons";

import screenfull from "screenfull";
import "@/style/view-style/index.scss";

const Entry = () => {
  return (
    <section className="create-entry">
      <p className="section-title">创建新应用</p>
      <Row className="index-header ">
        <Space>
          <Card
            style={{
              width: 300
            }}
            className="card"
            hoverable={true}
            actions={[]}
          >
            <div className="card-header">
              <PlusCircleOutlined
                style={{
                  fontSize: 30,
                  color: "#006eff",
                  marginRight: 10,
                  verticalAlign: "center"
                }}
              />
              <p className="title">快速创建表单应用</p>
            </div>
            <div className="card-content">适用于表单信息的收集</div>
            <Image
              rootClassName="card-img"
              width={150}
              src={
                "https://cloudcache.tencentcs.com/qcloud/tea/app/lcap.2885b7aae7fec003905dc379b73fb3d0.png"
              }
            />
          </Card>
          <Card
            style={{
              width: 300
            }}
            className="card"
            hoverable={true}
            actions={[]}
          >
            <div className="card-header">
              <PlusCircleOutlined
                style={{
                  fontSize: 30,
                  color: "#006eff",
                  marginRight: 10,
                  verticalAlign: "center"
                }}
              />
              <p className="title">快速创建表单应用</p>
            </div>
            <div className="card-content">适用于表单信息的收集</div>
            <Image
              rootClassName="card-img"
              width={150}
              src={
                "https://cloudcache.tencentcs.com/qcloud/tea/app/lcap.a9622ecd944e03b7900d8206fceefb89.png"
              }
            />
          </Card>
        </Space>
      </Row>
    </section>
  );
};

const AppList = () => {
  const { Meta } = Card;
  return (
    <section className="application-list">
      <p className="section-title">我的应用</p>
      <Row className="index-header ">
        <Space>
          <Card
            style={{
              width: 300
            }}
            cover={
              <img
                alt="example"
                src="https://qcloudimg.tencent-cloud.cn/raw/297010834f5c77317a1ec0f9ea865031.png"
              />
            }
            hoverable={true}
            actions={[
              <SettingOutlined key="setting" />,
              <EditOutlined key="edit" />,
              <DeleteOutlined key="ellipsis" />
            ]}
          >
            <Meta
              avatar={<Avatar src="https://joeschmoe.io/api/v1/random" />}
              title="Card title"
              description="This is the description"
            />
          </Card>
          <Card
            style={{
              width: 300
            }}
            cover={
              <img
                alt="example"
                src="https://qcloudimg.tencent-cloud.cn/raw/2f027bc952bcadcc3b4f17e20690a913.png"
              />
            }
            hoverable={true}
            actions={[
              <SettingOutlined key="setting" />,
              <EditOutlined key="edit" />,
              <DeleteOutlined key="ellipsis" />
            ]}
          >
            <Meta
              avatar={<Avatar src="https://joeschmoe.io/api/v1/random" />}
              title="Card title"
              description="This is the description"
            />
          </Card>
        </Space>
      </Row>
    </section>
  );
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
        <Entry />
        <AppList />
      </Layout>
    );
  }
}

export default Index;

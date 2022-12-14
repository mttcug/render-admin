import React, { Component } from "react";
import { Layout, Row, Col, Card } from "antd";
import { PlusCircleOutlined } from "@ant-design/icons";

import screenfull from "screenfull";
import "@/style/view-style/index.scss";
import "./index.scss";

class Index extends Component {
  fullToggle = () => {
    if (screenfull.isEnabled) {
      screenfull.request(document.getElementById("bar"));
    }
  };
  render() {
    return (
      <Layout className="index animated fadeIn index-container">
        <Row>
          <Card
            style={{
              width: 300
            }}
            cover={
              <img
                alt="example"
                src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
              />
            }
            actions={[]}
          >
            <PlusCircleOutlined
              style={{
                fontSize: 30,
                color: "#006eff",
                marginRight: 20,
                verticalAlign: "center"
              }}
            />
            快速创建表单应用
          </Card>
        </Row>
      </Layout>
    );
  }
}

export default Index;

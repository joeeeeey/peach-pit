import React, { Component } from "react";
import AppBar from "components/common/layouts/appBar";
import PropTypes from "prop-types";

export default class AboutPage extends Component {
  constructor(props, context) {
    super(props);
    this.beforeLogin = true;
    const user = context.store.getState().user;
    if (user && user.isLogin) {
      this.beforeLogin = false;
    }
  }

  render() {
    return (
      <div>
        <AppBar beforeLogin={this.beforeLogin} />
        <div
          style={{ color: "#777", textAlign: "center", padding: "30px 80px" }}>
          <h3 style={{ textAlign: "center" }}>简介</h3>
          <p style={{ fontSize: 16, marginTop: 20, textAlign: "center" }}>
            桃核空间是一个帮你建站并且直接发布的站点。发布时你的网站将会被分配本站的一个二级域名，
            整个过程都是免费的。
          </p>
        </div>

        <div
          style={{ color: "#777", textAlign: "center", padding: "30px 80px" }}>
          <h3 style={{ textAlign: "center" }}>告知</h3>
          <div style={{ width: "70%", margin: "auto", marginTop: 20 }}>
            <p>1. 前 1000 个发布的站点会拥有 'vip' 的前缀~</p>
            <p>2. 更多好用的模板，组件，动画等正在制作中。</p>
            <p>
              3. 项目基于 React，
              对于开发者，你可以在'我的网站'中下载已部署网站的打包文件。
            </p>
          </div>
        </div>

        <div
          style={{ color: "#777", textAlign: "center", padding: "30px 80px" }}>
          <h3 style={{ textAlign: "center" }}>联系作者</h3>

          <p style={{ fontSize: 16, textAlign: "center", marginTop: 20 }}>
            邮箱: joey9303@outlook.com
          </p>
          <p style={{ fontSize: 16, textAlign: "center", marginTop: 20 }}>
            随时欢迎向我提出对该站点的建议，需求。
          </p>
        </div>

        <div
          style={{ color: "#777", textAlign: "center", padding: "30px 80px" }}>
          <h3 style={{ textAlign: "center" }}>请我喝杯咖啡?</h3>
          <div
            style={{
              width: "70%",
              margin: "auto",
              marginTop: 20,
              textAlign: "center"
            }}>
            <div style={{ width: "50%", margin: "auto", float: "left" }}>
              <div
                style={{ width: "80%", padding: "20px 20px", margin: "auto" }}>
                <img
                  style={{ width: "100%", height: "100%" }}
                  src={
                    "http://blog-src.b0.upaiyun.com/taohe/dev/basic/template/25fd894c6a70512b189a7605f463d126!thumbnails/sq/220"
                  }
                  alt={"my_alipay_qr"}
                />
              </div>
            </div>
            <div style={{ width: "50%", margin: "auto", float: "right" }}>
              <div
                style={{ width: "80%", padding: "20px 20px", margin: "auto" }}>
                <img
                  style={{ width: "100%", height: "100%" }}
                  src={
                    "http://blog-src.b0.upaiyun.com/taohe/dev/basic/template/7e38adfe0a35139cc9ca229561496c7a!thumbnails/sq/220"
                  }
                  alt={"my_wechat_qr"}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

AboutPage.contextTypes = {
  store: PropTypes.object
};

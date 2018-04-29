

import React, { Component } from 'react';
import AppBar from '../../components/common/layouts/appBar'

export default class UserSite extends Component {
  constructor(props, context) {
    super(props)

  }


  render() {
    return (
      <div>
        <AppBar />
        <div style={{ color: '#777',  textAlign: 'center', padding: '30px 80px', textAlign: 'justify' }}>
          <h3 style={{ textAlign: 'center' }}>简介</h3>
          <p style={{ fontSize: 16, marginTop: 20, textAlign: 'center' }}>桃核空间是一个帮你建站并且直接发布的站点。发布时你的网站将会被分配本站的一个二级域名， 整个过程都是免费的。</p>
        </div>

        <div style={{ color: '#777',  textAlign: 'center', padding: '30px 80px', textAlign: 'justify' }}>
          <h3 style={{ textAlign: 'center' }}>告知</h3>
          <div style={{ width: '70%', margin: 'auto', marginTop: 20, }}>
            <p>1. 前 1000 个发布的站点会拥有 'vip' 的前缀~</p>
            <p>2. 更多好用的组件，动画等正在制作中。</p>
            <p>3. 项目基于  React， 对于开发者，本站即将推出 '建站完后可下载打包后的网站资源' 功能，你可以将文件部署到自己的机器。</p>
          </div>
        </div>

        <div style={{ color: '#777',  textAlign: 'center', padding: '30px 80px', textAlign: 'justify' }}>
          <h3 style={{ textAlign: 'center' }}>联系作者</h3>

          <p style={{ fontSize: 16, textAlign: 'center', marginTop: 20, }}>邮箱: joey9303@outlook.com</p>
          <p style={{ fontSize: 16, textAlign: 'center', marginTop: 20, }}>随时欢迎向我提出对该站点的建议，需求。</p>
        </div>

        <div style={{ color: '#777',  textAlign: 'center', padding: '30px 80px', textAlign: 'justify' }}>
          <h3 style={{ textAlign: 'center' }}>请我喝咖啡?</h3>
          <div style={{ width: '70%', margin: 'auto', marginTop: 20, textAlign: 'center'}}>
            <div style={{ width: '50%', margin: 'auto', float: 'left' }}>
              <div style={{ width: '80%', padding: '20px 20px',  margin: 'auto',}}>
                <img
                  style={{ maxWidth: '100%', maxHeight: 283  }}
                  src={"/images/aboutPage/my_alipay_qr.JPG"} />
              </div>
            </div>
            <div style={{ width: '50%', margin: 'auto', float: 'right' }}>
              <div style={{ width: '80%', padding: '20px 20px', margin: 'auto', }}>
                <img
                  style={{ maxWidth: '100%', maxHeight: 283 }}
                  src={"/images/aboutPage/my_wechat_qr.JPG"} />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}



// 简介
// 桃核空间是一个帮你建站并且直接发布的站点。发布时你的网站将会被分配本站的一个二级域名， 整个过程都是免费的。
//                   告知
// 1 前 1000 制作的站点会拥有 'vip' 的前缀~
// 2 更多好用的组件，动画等正在制作中。
// 3 该项目基于  React， 对于开发者，本站即将推出 '建站完后可下载打包后的网站资源' 功能，你可以将文件部署到自己的机器。

//             联系作者

// 邮箱: joey9303@outlook.com

// 随时欢迎向我提出对该站点的建议，需求。
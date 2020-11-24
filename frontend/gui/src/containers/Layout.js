import React from 'react'
import { Layout, Breadcrumb } from 'antd';
import {Link} from 'react-router-dom'
const { Header, Content, Footer } = Layout;
const CustomLayout = (props) =>
{

    return(

          <Layout className="layout">
            <Header>
              <div className="logo" />
            </Header>
            <Content style={{ padding: '0 50px' }}>
              <Breadcrumb style={{ margin: '16px 0' }}>
                  <Breadcrumb.Item><Link to="/">Home</Link></Breadcrumb.Item>
              </Breadcrumb>
              <div className="site-layout-content">
                  {props.children}
              </div>
            </Content>
            <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
          </Layout>


    );
}
export default CustomLayout;
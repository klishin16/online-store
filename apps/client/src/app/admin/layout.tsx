'use client'
import React, { useState } from 'react';
import { Breadcrumb, Layout, Menu, theme } from 'antd';
// import AdminSettings from "../components/admin/AdminSettings";
// import AdminUsersListView from "../components/admin/users/AdminUsersListView";
// import StatisticView from "../components/admin/StatisticView";
// import { useActions } from "../hooks/useActions";
// import { RouteNames } from "../routes/routerPaths";
// import { IBreadcrumbRoute } from "../components/admin/AdminViewHeader";
import styled from "@emotion/styled";
import { useTypedSelector } from "@/hooks";
import Link from "next/link";
import { sidebarItems } from "@/constants";
import { Content } from "antd/es/layout/layout";
import { UploadOutlined, UserOutlined, VideoCameraOutlined } from "@ant-design/icons";

const { Header, Footer, Sider } = Layout;

const AdminPageHeader = styled(Header)`
  z-index: 1;
  padding: 0;
  box-shadow: rgba(0, 21, 41, 0.12) 0 1px 4px 0
`

const Logo = styled.div`
  height: 32px;
  margin: 16px;
  background: rgba(255, 255, 255, .2);
  border-radius: 6px;
`


export default function AdminLayout({ children }: { children: React.ReactNode }) {
    const logout = () => {

    }

    const {
        token: { colorBgContainer },
    } = theme.useToken();

    const { user } = useTypedSelector(state => state.auth)

    const [collapseSide, setCollapseSide] = useState(false)

    const onCollapse = (collapsed: boolean) => {
        setCollapseSide(collapsed)
    };

    const menuItems = () => sidebarItems.map((menuItem, index) => (
        <Menu.Item key={ index } icon={ menuItem.icon }>
            <Link href={ menuItem.view }>{ menuItem.title }</Link>
        </Menu.Item>
    ))


    return (
        <Layout style={ { minHeight: '100vh' } }>
            <Sider collapsible collapsed={ collapseSide } onCollapse={ onCollapse }>
                <Logo/>

                <Menu
                    theme="dark"
                    defaultSelectedKeys={ ['0'] }
                    mode="inline"
                >
                    { menuItems() }
                </Menu>
            </Sider>

            <Layout>
                <Header style={ { padding: 0, background: colorBgContainer } }/>
                <Content style={ { margin: '0 16px' } }>
                    { children }
                </Content>
                <Footer style={ { textAlign: 'center' } }>Ant Design ©2023 Created by Ant UED</Footer>
            </Layout>

            {/*<Layout className="site-layout">*/ }
            {/*    <AdminPageHeader className="site-layout-background">*/ }
            {/*        <Row style={ { height: '100%' } } justify={ "end" } align={ "middle" }>*/ }
            {/*            { user && <Text>{ user.email }</Text> }*/ }
            {/*            <Button style={ { marginLeft: '1vw', marginRight: '1vw' } } danger ghost={ true }*/ }
            {/*                    onClick={ logout }>Logout</Button>*/ }
            {/*        </Row>*/ }
            {/*    </AdminPageHeader>*/ }

            {/*    */ }
            {/*    <Footer style={ { textAlign: 'center' } }>©2021 Created by klishin16</Footer>*/ }
            {/*</Layout>*/ }
        </Layout>
    );
};

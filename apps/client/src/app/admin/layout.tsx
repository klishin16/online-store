'use client'
import React, { useState } from 'react';
import { Button, Layout, Menu, Row } from 'antd';
// import AdminSettings from "../components/admin/AdminSettings";
// import AdminUsersListView from "../components/admin/users/AdminUsersListView";
// import StatisticView from "../components/admin/StatisticView";
// import { useActions } from "../hooks/useActions";
// import { RouteNames } from "../routes/routerPaths";
// import { IBreadcrumbRoute } from "../components/admin/AdminViewHeader";
import styled from "@emotion/styled";
// import AdminDevicesView from "../components/admin/devices/AdminDevicesView";
// import AdminCategoriesView from "../components/admin/categories/AdminCategoriesView";
// import AdminBrandsView from "../components/admin/brands/AdminBrandsView";
import Text from "antd/es/typography/Text";
import { useTypedSelector } from "@/hooks";
import Link from "next/link";
import { sidebarItems } from "@/constants";
import { usePathname } from "next/navigation";

const { Header, Footer, Sider } = Layout;

// const {SubMenu} = Menu;

const AdminPageHeader = styled(Header)`
  z-index: 1;
  padding: 0;
  box-shadow: rgba(0, 21, 41, 0.12) 0 1px 4px 0
`

const ViewsWrapper = styled.div`
`
// : IBreadcrumbRoute[] TODO
const currentBreadcrumbPath = [{
    path: '/admin',
    breadcrumbName: 'Admin'
}];

export default function AdminLayout({ children, }: { children: React.ReactNode }) {
    const currentPath = usePathname();

    const logout = () => {

    }

    // const history = useHistory()
    // const {logout} = useActions()
    // let {path, url} = useRouteMatch();

    const { user } = useTypedSelector(state => state.auth)

    const [collapseSide, setCollapseSide] = useState(false)

    const onCollapse = (collapsed: boolean) => {
        setCollapseSide(collapsed)
    };


    return (
        <Layout style={ { minHeight: '100vh' } }>
            <Sider collapsible collapsed={ collapseSide } onCollapse={ onCollapse }>
                <Menu
                    theme="dark"
                    defaultSelectedKeys={ ['0'] }
                    mode="inline"
                >
                    { sidebarItems.map((menuItem, index) =>
                        <Menu.Item key={ index } icon={ menuItem.icon }>
                            <Link href={ currentPath +  menuItem.view }>{ menuItem.title }</Link>
                        </Menu.Item>
                    ) }
                    {/*<Menu.Item key="11" icon={<RollbackOutlined/>} onClick={() => history.push(RouteNames.INDEX)}>*/ }
                    {/*    Back to shop*/ }
                    {/*</Menu.Item>*/ }
                </Menu>
            </Sider>

            <Layout className="site-layout">
                <AdminPageHeader className="site-layout-background">
                    <Row style={ { height: '100%' } } justify={ "end" } align={ "middle" }>
                        { user && <Text>{ user.email }</Text> }
                        <Button style={ { marginLeft: '1vw', marginRight: '1vw' } } danger ghost={ true }
                                onClick={ logout }>Logout</Button>
                    </Row>
                </AdminPageHeader>

                <ViewsWrapper>
                    { children }
                    {/*<Route exact path={path + AdminViews.STATISTICS}>*/ }
                    {/*    <StatisticView breadcrumbPath={currentBreadcrumbPath}/>*/ }
                    {/*</Route>*/ }
                    {/*<Route path={path + AdminViews.SETTINGS}>*/ }
                    {/*    <AdminSettings/>*/ }
                    {/*</Route>*/ }
                    {/*<Route path={path + AdminViews.USERS}>*/ }
                    {/*    <AdminUsersListView breadcrumbPath={currentBreadcrumbPath}/>*/ }
                    {/*</Route>*/ }
                    {/*<Route path={path + AdminViews.DEVICES}>*/ }
                    {/*    <AdminDevicesView breadcrumbPath={currentBreadcrumbPath}/>*/ }
                    {/*</Route>*/ }
                    {/*<Route path={path + AdminViews.CATEGORIES}>*/ }
                    {/*    <AdminCategoriesView breadcrumbPath={currentBreadcrumbPath}/>*/ }
                    {/*</Route>*/ }
                    {/*<Route path={path + AdminViews.BRANDS}>*/ }
                    {/*    <AdminBrandsView breadcrumbPath={currentBreadcrumbPath}/>*/ }
                    {/*</Route>*/ }
                </ViewsWrapper>
                <Footer style={ { textAlign: 'center' } }>©2021 Created by klishin16</Footer>
            </Layout>
        </Layout>
    );
};

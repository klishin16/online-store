'use client'
import { generateTableConfig } from "@/functions";
import Link from "next/link";
import { IAdminViewProps, IBreadcrumbRoute } from "@/types";
import { useGetApi } from "@/hooks";
import React from "react";
import { IDevice } from "@/models";
import { Button, Card, Layout, Row, Table } from "antd";
import { RedoOutlined } from "@ant-design/icons";
import { Content } from "antd/es/layout/layout";
import { AppColors } from "@/constants";
import { usePathname } from "next/navigation";


const DevicesAdminPage = () => {
    const [devices, loading, error, refreshDevices] = useGetApi<IDevice[]>('/devices', true)
    const current_path = usePathname()

    const showModal = () => {

    }

    // const {
    //     showModal,
    //     ...deviceCreationFormProps
    // } = useModalForm<DeviceCreationValues>("Create new device", '/devices', true)

    const columns = generateTableConfig([
        {
            title: 'id',
            render: (id: number) => <Link href={ current_path + '/' + id }>{ id }</Link>
        },
        {
            title: 'name'
        },
        {
            title: 'price'
        },
        {
            title: 'sale'
        }
    ])


    return (
        <div>
            {/*<Route exact path={ path }>*/ }
            <Layout>
                {/*<AdminViewHeader*/ }
                {/*    title={ "Devices" }*/ }
                {/*    subTitle={ "Display all app devices" }*/ }
                {/*    breadcrumbPath={ currentBreadcrumbPath }*/ }
                {/*/>*/ }

                <Content style={ { marginTop: '2.3vh', marginLeft: "1.6vw", marginRight: "1.6vw" } }>
                    <Card size={ "small" }>
                        <Row justify={ "end" }>
                            <Button
                                color={ "blue" }
                                icon={ <RedoOutlined/> }
                                loading={ loading }
                                onClick={ () => refreshDevices() }
                            >Refresh</Button>
                            <Button onClick={ () => showModal() } style={ {
                                color: AppColors.GREEN,
                                borderColor: AppColors.GREEN,
                                marginLeft: '.5vw'
                            } }>Create</Button>
                        </Row>
                    </Card>

                    {/*<DeviceCreationForm { ...deviceCreationFormProps } />*/ }

                    <Table loading={ loading } columns={ columns } dataSource={ devices! }/>
                </Content>
            </Layout>
            {/*</Route>*/ }
            {/*<Route exact path={ `${ path }/:deviceId` }>*/ }
            {/*    <AdminDeviceDetailView breadcrumbPath={ currentBreadcrumbPath }/>*/ }
            {/*</Route>*/ }
        </div>

    );
}

export default DevicesAdminPage

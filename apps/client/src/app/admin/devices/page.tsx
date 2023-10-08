'use client'
import { generateTableConfig } from "@/functions";
import Link from "next/link";
import { IAdminViewProps, IBreadcrumbRoute, IDrawerCloseParams } from "@/types";
import { useGetApi, useModalForm } from "@/hooks";
import React, { useState } from "react";
import { IDevice } from "@/models";
import { Breadcrumb, Button, Card, Layout, Row, Table } from "antd";
import { PlusOutlined, RedoOutlined } from "@ant-design/icons";
import { Content } from "antd/es/layout/layout";
import { AppColors } from "@/constants";
import { usePathname } from "next/navigation";
import DeviceCreationForm, { DeviceCreationValues } from "@/app/components/devices/device-creation-form";
import DeviceCreationDrawer from "@/app/components/devices/device-creation-drawer";
import styled from "@emotion/styled";
import AppBreadcrumbs from "@/app/components/breadcrumbs";

const DeviceContainer = styled.div`
  padding: 14px;
  background-color: rgb(255, 255, 255);
`

const DevicesAdminPage = () => {
    const [devices, loading, error, refreshDevices] = useGetApi<IDevice[]>('/devices', true);
    const current_path = usePathname();

    const [isDrawerOpened, setIsDrawerOpened] = useState(false);

    const showDrawer = () => {
        setIsDrawerOpened(true);
    };

    const onDrawerClose = (params?: IDrawerCloseParams) => {
        setIsDrawerOpened(false);
        if (params?.refreshItems) {
            refreshDevices();
        }
    };

    const columns = generateTableConfig([
        {
            title: 'id',
            render: (id: number) => <Link href={ current_path + '/' + id }>{ id }</Link>
        },
        { title: 'name' },
        { title: 'price' },
        { title: 'sale' }
    ])


    return (
        <>
            <AppBreadcrumbs />

            <DeviceContainer>
                <Card size={ "small" } style={{ marginBottom: 8 }}>
                    <Row justify={ "end" }>
                        <Button
                            color={ "blue" }
                            icon={ <RedoOutlined/> }
                            loading={ loading }
                            onClick={ () => refreshDevices() }
                        >Refresh</Button>
                        <Button onClick={ () => showDrawer() } style={ {
                            color: AppColors.GREEN,
                            borderColor: AppColors.GREEN,
                            marginLeft: '.5vw'
                        } }>Create</Button>
                    </Row>
                </Card>

                <Table loading={ loading } columns={ columns } dataSource={ devices! }/>

                <DeviceCreationDrawer open={ isDrawerOpened } onClose={ onDrawerClose }></DeviceCreationDrawer>
            </DeviceContainer>
        </>
    );
}

export default DevicesAdminPage

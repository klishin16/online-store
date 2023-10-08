'use client'
import React, { useState } from 'react';
import { Button, Card, Row, Table } from "antd";
import { RedoOutlined } from "@ant-design/icons";
import { useAppDispatch, useRequest, useTypedSelector } from "@/hooks";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { generateTableConfig } from "@/functions";
import BrandCreationDrawer from "@/app/components/brands/brand-creation-drawer";
import { AppColors } from "@/constants";
import { BrandsService } from "@/services/brands.service";
import { addNotification } from "@/redux/features/notifications.slice";
import { errorHandler } from "@/functions/error-handler";
import { IDrawerCloseParams } from "@/types";
import styled from "@emotion/styled";
import AppBreadcrumbs from "@/app/components/breadcrumbs";


const BrandsContainer = styled.div`
  padding: 14px;
  background-color: rgb(255, 255, 255);
`

const AdminBrands: React.FC = () => {
    const pathname = usePathname();
    const dispatch = useAppDispatch();
    const { token } = useTypedSelector(state => state.auth);
    // TODO token!
    const [brands, loading, refreshBrands] = useRequest(() =>
        BrandsService.fetchAll(token!)
            .catch((error) => {
                dispatch(
                    addNotification({
                        title: 'Brands loading error',
                        message: errorHandler(error),
                        type: 'error'
                    })
                );
            })
    )

    const [isDrawerOpened, setIsDrawerOpened] = useState(false);

    const showDrawer = () => {
        setIsDrawerOpened(true);
    };

    const onDrawerClose = (params?: IDrawerCloseParams) => {
        setIsDrawerOpened(false);
        if (params?.refreshItems) {
            refreshBrands();
        }
    };

    const columns = generateTableConfig([
        {
            title: 'id',
            render: (id: number) => <Link href={ pathname + '/' + id }>{ id }</Link>
        },
        {
            title: 'name'
        },
        {
            title: 'description'
        }
    ])

    return (
        <>
            <AppBreadcrumbs/>

            <BrandsContainer>
                <Card size={ "small" } style={ { marginBottom: 8 } }>
                    <Row justify={ "end" }>
                        <Button
                            color={ "blue" }
                            icon={ <RedoOutlined/> }
                            loading={ loading }
                            onClick={ () => refreshBrands() }
                        >Refresh</Button>
                        <Button onClick={ () => showDrawer() } style={ {
                            color: AppColors.GREEN,
                            borderColor: AppColors.GREEN,
                            marginLeft: '.5vw'
                        } }>Create</Button>
                    </Row>
                </Card>

                <BrandCreationDrawer open={ isDrawerOpened } onClose={ onDrawerClose }/>

                <Table rowKey={ 'id' } loading={ loading } columns={ columns } dataSource={ brands ?? [] }/>
            </BrandsContainer>
        </>
    );
};

export default AdminBrands;

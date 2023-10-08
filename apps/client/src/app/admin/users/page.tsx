'use client'
import React, { useState } from 'react';
import { Button, Card, Row, Table, Tag } from "antd";
import { useGetApi } from "@/hooks";
import { EUserRoles, IUser } from "@/models";
import { usePathname } from "next/navigation";
import { generateTableConfig } from "@/functions";
import Link from "next/link";
import styled from "@emotion/styled";
import AppBreadcrumbs from "@/app/components/breadcrumbs";
import { RedoOutlined } from "@ant-design/icons";
import { AppColors } from "@/constants";
import { IDrawerCloseParams } from "@/types";
import UserCreationDrawer from "@/app/components/users/user-creation-drawer";


const UsersContainer = styled.div`
  padding: 14px;
  background-color: rgb(255, 255, 255);
`


const AdminUsers: React.FC = () => {
    const [users, loading, _, refreshUsers] = useGetApi<IUser[]>('/users', true);
    const current_path = usePathname();

    const [isDrawerOpened, setIsDrawerOpened] = useState(false);

    const showDrawer = () => {
        setIsDrawerOpened(true);
    };

    const onDrawerClose = (params?: IDrawerCloseParams) => {
        setIsDrawerOpened(false);
        if (params?.refreshItems) {
            refreshUsers();
        }
    };


    const columns = generateTableConfig([
        {
            title: 'id',
            render: (id: number) => <Link href={ current_path + '/' + id }>{ id }</Link>
        },
        {
            title: 'email'
        },
        {
            title: 'password'
        },
        {
            title: 'role',
            render: (role: EUserRoles) => (
                <Tag color={ 'green' }>
                    { role.toUpperCase() }
                </Tag>
            )
        }
    ])


    return (
        <>
            <AppBreadcrumbs/>

            <UsersContainer>
                <Card size={ "small" } style={ { marginBottom: 8 } }>
                    <Row justify={ "end" }>
                        <Button
                            color={ "blue" }
                            icon={ <RedoOutlined/> }
                            loading={ loading }
                            onClick={ () => refreshUsers() }
                        >Refresh</Button>
                        <Button onClick={ () => showDrawer() } style={ {
                            color: AppColors.GREEN,
                            borderColor: AppColors.GREEN,
                            marginLeft: '.5vw'
                        } }>Create</Button>
                    </Row>
                </Card>

                <Table loading={ loading } columns={ columns } dataSource={ users! }/>
                
                <UserCreationDrawer open={isDrawerOpened} onClose={onDrawerClose} />
            </UsersContainer>
        </>
    );
};

export default AdminUsers;

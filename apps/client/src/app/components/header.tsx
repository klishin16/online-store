'use client'

import React from 'react';
import { Badge, Button, Card } from "antd";
import styled from "@emotion/styled";
import { LoginOutlined } from '@ant-design/icons';
import Title from "antd/es/typography/Title";
import { useAppDispatch, useAuthSession, useTypedSelector } from "@/hooks";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ERoutes } from "@/constants";
import { EUserRoles } from "@/models";
import { authActions } from "@/redux/features/auth.slice";
import { useBasket } from "@/hooks/useBasket";


// const AppLogo = styled.div`
//       float: left;
//       width: 120px;
//       height: 31px;
//       margin: 16px 24px 16px 0;
//       background: rgba(255, 255, 255, 0.2);
//     `

const HeaderWrapper = styled.div`
  display: flex;
`

const HeaderLinksWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
`

const AppHeader = () => {
    const router = useRouter();
    const dispatch = useAppDispatch();
    const [user] = useAuthSession();
    const { id } = useBasket();
    const { purchases } = useTypedSelector(state => state.basket);

    const logout = () => {
        dispatch(authActions.logout())
    }

    const authLinks = user ?
        <>
            <Button
                type={ "link" }
                onClick={ () => router.push(ERoutes.PROFILE) }
                key="5"
            >
                { user.email }
            </Button>

            <Badge count={ purchases?.length ?? 0 }>
                <Button type={ "link" } onClick={ () => router.push(ERoutes.BASKET) } key="6">Basket</Button>
            </Badge>
            { user.role === EUserRoles.ADMIN &&
                <Button type={ "link" } onClick={ () => router.push(ERoutes.ADMIN) } key="6">Admin</Button> }
            <Button type={ "link" } onClick={ () => logout() } key="7">Logout</Button>

        </>
        :
        <>
            <Button type={ "link" } icon={ <LoginOutlined/> } onClick={ () => router.push(ERoutes.LOGIN) }
                    key="5">Login</Button>
            <Button type={ "link" } onClick={ () => router.push(ERoutes.REGISTRATION) }
                    key="6">Registration</Button>
        </>

    return (
        <Card type={ "inner" } style={ { position: 'fixed', zIndex: 1, width: '100%' } }>
            <HeaderWrapper>
                {/*<AppLogo/>*/ }
                <HeaderLinksWrapper>
                    <div style={ { padding: '0 50px', display: "flex" } }>
                        <Link href={ ERoutes.DEVICES }><Title level={ 3 } style={ { marginBottom: 0 } }>REACT
                            SHOP</Title></Link>
                    </div>
                    <div style={ { display: 'flex' } }>
                        { authLinks }
                    </div>
                </HeaderLinksWrapper>
            </HeaderWrapper>

        </Card>
    );
};

export default AppHeader;

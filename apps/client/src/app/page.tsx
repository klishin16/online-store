'use client'
import Link from "next/link";
import { useAuthSession } from "@/hooks";
import { Layout } from "antd";
import AppHeader from "@/app/components/header";
import { Footer } from "antd/lib/layout/layout";

export default function Home() {
    const user = useAuthSession();

    return (
        <Layout>

            {/*<SideCatalog visible={ sidebarVisible } onClose={ () => setSidebarVisible(false) }/>*/ }

            {/*<Content className="site-layout" style={ { padding: '0 50px', marginTop: 64, background: '#fff' } }>*/ }
            {/*    <ContentWrapper style={ { padding: 24, minHeight: 380 } }>*/ }
            {/*        <HeaderSearch sideBarToggle={ setSidebarVisible }/>*/ }

            {/*        <Route exact path={ path }>*/ }

            {/*            <Row style={ { marginTop: '5vh' } }>*/ }
            {/*                <Card style={ { background: '#364d79', width: '100%', height: '34vh' } }>*/ }
            {/*                    <CarouselItem>*/ }

            {/*                    </CarouselItem>*/ }
            {/*                </Card>*/ }
            {/*            </Row>*/ }


            {/*            <Row style={ { marginTop: '3vh' } } justify={ "start" }>*/ }
            {/*                <Title style={ { fontWeight: "lighter" } } level={ 2 }>Популярные категории</Title>*/ }
            {/*            </Row>*/ }
            {/*            <Row>*/ }
            {/*                <CategoriesCardsWrapper>*/ }
            {/*                    { categoryCard }*/ }
            {/*                    { categoryCard }*/ }
            {/*                    { categoryCard }*/ }
            {/*                    { categoryCard }*/ }
            {/*                    { categoryCard }*/ }
            {/*                </CategoriesCardsWrapper>*/ }
            {/*            </Row>*/ }

            {/*            <Row style={ { marginTop: '3vh' } } justify={ "start" }>*/ }
            {/*                <Divider/>*/ }
            {/*                <Title style={ { fontWeight: "lighter" } } level={ 2 }>Контакты</Title>*/ }
            {/*            </Row>*/ }
            {/*            <Row>*/ }
            {/*                <Col span={ 5 }>*/ }
            {/*                    <ul style={ { listStyle: "none" } }>*/ }
            {/*                        <li>*/ }
            {/*                            <Typography.Text style={ { fontSize: '1rem' } }>Email:*/ }
            {/*                                klishin.nd16@gmail.com</Typography.Text>*/ }
            {/*                        </li>*/ }
            {/*                        <li>*/ }
            {/*                            <Typography.Text style={ { fontSize: '1rem' } }>Git:*/ }
            {/*                                @klishin16</Typography.Text>*/ }
            {/*                        </li>*/ }
            {/*                    </ul>*/ }
            {/*                </Col>*/ }
            {/*            </Row>*/ }
            {/*        </Route>*/ }

            {/*        <Route exact path={ RouteNames.DEVICES }>*/ }
            {/*            <DevicesPage/>*/ }
            {/*        </Route>*/ }

            {/*        <Route exact path={ RouteNames.BASKET }>*/ }
            {/*            <BasketPage/>*/ }
            {/*        </Route>*/ }
            {/*    </ContentWrapper>*/ }
            {/*</Content>*/ }
        </Layout>
    )
}

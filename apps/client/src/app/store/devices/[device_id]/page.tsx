'use client'
import styled from "@emotion/styled";
import { useAppDispatch, useRequest } from "@/hooks";
import React from "react";
import { IDevice } from "@/models";
import { Button, Col, Image, Row, Spin } from "antd";
import { BACKEND_URL, ERoutes } from "@/constants";
import { DevicesService } from "@/services";
import { addNotification } from "@/redux/features/notifications.slice";
import { errorHandler } from "@/functions/error-handler";
import Title from "antd/es/typography/Title";
import Text from "antd/es/typography/Text";
import { basketActions } from "@/redux/features/basket.slice";
import { useRouter } from "next/navigation";

const DeviceDetailPageContainer = styled.div`
  width: 90vw;
  height: calc(100% - 120px);
  margin: 90px auto 30px auto;
  padding: 14px;
  background-color: rgb(255, 255, 255);
  border-radius: 8px;

  display: flex;
  flex-direction: column;
`

const DeviceCard = styled.div`
  width: 100%;
  padding: 14px;
  background-color: rgb(255, 255, 255);
  border-radius: 8px;

  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  gap: 8px;
`

const DeviceDetailPage = ({ params }: { params: { device_id: number } }) => {
    const dispatch = useAppDispatch();
    const router = useRouter()

    const [device, loading] = useRequest(() =>
        DevicesService.fetchOne(params.device_id)
            .catch((error) => {
                dispatch(
                    addNotification({
                        title: 'Device loading error',
                        message: errorHandler(error),
                        type: 'error'
                    })
                );
            })
    )

    const buyHandler = (device: IDevice) => {
        dispatch(basketActions.addDevice({ device, amount: 1 })).then((v) => {
            console.log('v', v)
        })
    }

    const buyNowHandler = (device: IDevice) => {
        dispatch(basketActions.addDevice({ device, amount: 1 })).then((v) => {
            router.push(ERoutes.BASKET)
        })
    }

    if (!device || loading) {
        return <DeviceDetailPageContainer style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}><Spin/></DeviceDetailPageContainer>
    }

    return (
        <DeviceDetailPageContainer>
            <Row gutter={ 14 }>
                <Col span={ 12 }>
                    <Image
                        width={ '100%' }
                        src={ BACKEND_URL + 'files/' + device.image_url }
                        preview={ false }
                    ></Image>
                </Col>
                <Col span={ 12 }>
                    <Row>
                        <Title level={ 1 }>{ device.name }</Title>
                    </Row>
                    <Row>
                        <Title level={ 1 }>{ device.brand?.name ?? '' }</Title>
                    </Row>
                    <Row>
                        <Title level={ 1 }>{ device.description ?? '' }</Title>
                    </Row>
                    <Row>
                        <Title level={ 2 }>Price:ㅤ</Title>
                        { device.sale ?
                            <div style={ { display: "flex", gap: '4px' } }>
                                <Title type='success'
                                       level={ 2 }>{ Math.floor(device.price * (100 - device.sale) / 100) } ₽</Title>
                                <Text delete>{ device.price }</Text>
                            </div> :
                            <Title style={{ margin: 0 }} level={ 2 }>{ device.price } ₽</Title>
                        }
                    </Row>
                    <Row gutter={ 8 }>
                        <Col>
                            <Button
                                size='large'
                                onClick={ () => buyHandler(device) }
                            >
                                Buy
                            </Button>

                        </Col>
                        <Col>
                            <Button
                                size='large'
                                type='primary'
                                onClick={ () => buyNowHandler(device) }
                            >
                                Buy now
                            </Button>
                        </Col>
                    </Row>
                </Col>
            </Row>
        </DeviceDetailPageContainer>
    )
}

export default DeviceDetailPage;

import { Button, Col, Image, Row, Space } from "antd";
import { BACKEND_URL, ERoutes } from "@/constants";
import Text from "antd/es/typography/Text";
import CountPicker from "@/app/components/count-picker";
import React, { useState } from "react";
import styled from "@emotion/styled";
import { IDevice } from "@/models";
import { usePathname, useRouter } from "next/navigation";
import Title from "antd/es/typography/Title";
import { basketActions } from "@/redux/features/basket.slice";
import { useAppDispatch } from "@/hooks";

const DeviceCardContainer = styled.div`
  width: 100%;

  padding: 12px;
  background-color: rgb(255, 255, 255);
  box-shadow: rgba(0, 0, 0, 0.1) 0 4px 20px 0;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  margin: 5px;
  position: relative;
`

interface IDeviceCardProps {
    device: IDevice
}

const DeviceCard: React.FC<IDeviceCardProps> = ({ device }) => {
    const router = useRouter();
    const pathname = usePathname();
    const dispatch = useAppDispatch();

    const [amount, setAmount] = useState<number>(1);

    const amountChangeHandler = (v: number) => {
        console.log('v', v)
        setAmount(v);
    }

    const buyHandler = (device: IDevice) => {
        dispatch(basketActions.addDevice({ device, amount })).then((v) => {
            console.log('v', v)
        })
    }

    const buyNowHandler = (device: IDevice) => {
        dispatch(basketActions.addDevice({ device, amount })).then((v) => {
            router.push(ERoutes.BASKET)
        })
    }

    return (
        <DeviceCardContainer>
            <Image
                width={ '100%' }
                src={ BACKEND_URL + 'files/' + device.image_url }
            />
            <Title style={{ cursor: 'pointer' }} level={ 4 } onClick={ () => router.push(pathname + '/' + device.id) }>
                { device.name }
            </Title>


            <Title level={ 5 } style={ { margin: 0, marginBottom: 8 } }>
                { device.brand ? `Brand: ${device.brand?.name}` : 'ㅤ' }
            </Title>

            <Row>

                { device.sale ?
                    <>
                        <Title type='success'
                               level={ 3 }>{ Math.floor(device.price * (100 - device.sale) / 100) } ₽</Title>
                        <Space></Space>
                        <Text delete>{ device.price }</Text>
                    </> :
                    <Title level={ 3 }>{ device.price } ₽</Title>
                }
            </Row>

            <Row style={ { marginBottom: 8 } }>
                <CountPicker onChange={ amountChangeHandler }/>
            </Row>

            <Row gutter={ 8 }>
                <Col>
                    <Button
                        onClick={ () => buyHandler(device) }
                    >
                        Buy
                    </Button>

                </Col>
                <Col>
                    <Button
                        type='primary'
                        onClick={ () => buyNowHandler(device) }
                    >
                        Buy now
                    </Button>
                </Col>
            </Row>
        </DeviceCardContainer>
    )
}

export default DeviceCard;

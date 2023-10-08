'use client'
import React, { useEffect } from 'react';
import { Button, Image, Row, Spin, Typography } from "antd";
import { useAppDispatch, useTypedSelector } from "@/hooks";
import styled from "@emotion/styled";
import { devicesActions } from "@/redux/features/devices.slice";
import { BACKEND_URL, TOKEN_KEY } from "@/constants";
import DevicesFilter from "@/app/components/devices/devices-filter";


const DevicesPageContainer = styled("div")`
  width: 100vw;
  padding-top: 72px;
  padding-bottom: 10px;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 16px;
`

const DeviceCardsContainer = styled.div`
  flex-basis: 300px;
  flex-grow: 1;
  align-self: flex-start;
  max-width: 80%;
  padding: 14px;
  border-radius: 8px;
  
  display: grid;
  grid-gap: 25px;
  grid-template-columns: repeat(auto-fit, 230px);
  justify-items: center;
  
  height: 100%;
  overflow-y: auto;
`
const DeviceCard = styled.div`
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

const { Title } = Typography

const DevicesPage = () => {
    const { devices, isLoading } = useTypedSelector(state => state.devices);
    const dispatch = useAppDispatch();

    const addDeviceToBasket = (deviceId: number) => {
        // if (!basket) await basketActions.loadBasket(user);
        // addDevice(basket?.id!, deviceId)
    }

    const devicesCards = devices.map(device => {
        return (
            <DeviceCard key={device.id}>
                <Image
                    width={ '100%' }
                    src={ BACKEND_URL + 'files/' + device.image_url }
                />
                <Title level={4}>
                    { device.name }
                </Title>

                <Title level={5} style={{ margin: 0, marginBottom: 8 }}>
                    Brand: { device.brand?.name ?? 'Not defined' }
                </Title>

                <Row style={{ gap: '12px' }}>
                    <Button type={ "primary" }>
                        { `Price: ${ device.price } RUB` }
                    </Button>
                    {/*    style={ {*/ }
                    {/*    background: AppColors.GREEN,*/ }
                    {/*    borderColor: AppColors.GREEN*/ }
                    {/*} }*/ }

                    <Button
                        onClick={ () => addDeviceToBasket(device.id!) }
                        loading={ isLoading }
                    >
                        Buy
                    </Button>
                </Row>
            </DeviceCard>
        )
    })

    useEffect(() => {
        const token = localStorage.getItem(TOKEN_KEY);
        if (!token) {
            return;
        }
        dispatch(devicesActions.fetchDevices(token));
    }, [])

    if (isLoading) {
        console.log('here')
        return (
            <DevicesPageContainer className='devices-page-container'>
                <Spin/>
            </DevicesPageContainer>
        )
    }

    return (
        <DevicesPageContainer className='devices-page-container'>
            <DevicesFilter />

            <DeviceCardsContainer className='devices-cards-container'>
                { devicesCards }
            </DeviceCardsContainer>
        </DevicesPageContainer>
    );
};

export default DevicesPage;

'use client'
import React, { useEffect } from 'react';
import { Button, Image, Row, Spin, Typography } from "antd";
import { useAppDispatch, useTypedSelector } from "@/hooks";
import styled from "@emotion/styled";
import { devicesActions } from "@/redux/features/devices.slice";
import { TOKEN_KEY } from "@/constants";
import { usePathname } from "next/navigation";


const DevicesPageContainer = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`

const DeviceCardsContainer = styled.div`
  width: 80vw;
  height: 90vh;
  background-color: rgb(255, 255, 255);
  border-radius: 8px;
  
  display: grid;
  gap: 20px;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  justify-items: center;
  align-items: center;
`
const DeviceCard = styled.div`
  padding: 12px;
  box-shadow: rgba(0, 0, 0, 0.1) 0 4px 20px 0;
  display: flex;
  flex-direction: column;
  margin: 5px;
  position: relative;
`

const { Text, Title } = Typography

const DevicesPage = () => {
    const pathname = usePathname()
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
                    src={ pathname + '/' + device.image }
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
            <DevicesPageContainer>
                <Spin/>
            </DevicesPageContainer>
        )
    }

    return (
        <DevicesPageContainer>
            {/*{ category &&*/ }
            {/*    <Card size={ "small" } style={ { marginBottom: '1vh' } }>*/ }
            {/*        <Row justify={ "space-between" }>*/ }
            {/*            <Title style={ { fontWeight: "lighter", marginBottom: '0' } } level={ 2 }>Выбранная*/ }
            {/*                категория: <i>{ category.name }</i></Title>*/ }
            {/*            <Button onClick={ () => setCategory(undefined) } danger>Reset</Button>*/ }
            {/*        </Row>*/ }
            {/*    </Card>*/ }
            {/*}*/ }

            {/*<DeviceFilter/>*/ }

            <DeviceCardsContainer>
                { devicesCards }
            </DeviceCardsContainer>
        </DevicesPageContainer>
    );
};

export default DevicesPage;

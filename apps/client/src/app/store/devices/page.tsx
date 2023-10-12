'use client'
import React, { useEffect } from 'react';
import { Button, Col, Image, Row, Space, Spin, Typography } from "antd";
import { useAppDispatch, useTypedSelector } from "@/hooks";
import styled from "@emotion/styled";
import { devicesActions } from "@/redux/features/devices.slice";
import { BACKEND_URL, TOKEN_KEY } from "@/constants";
import DevicesFilter from "@/app/components/devices/devices-filter";
import Text from "antd/es/typography/Text";
import { router } from "next/client";
import { usePathname, useRouter } from "next/navigation";
import { useBasket } from "@/hooks/useBasket";
import { basketActions } from "@/redux/features/basket.slice";
import { IDevice } from "@/models";
import CountPicker from "@/app/components/count-picker";
import DeviceCard from "@/app/components/devices/device-card";


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
  grid-template-rows: repeat(7, auto);
  justify-items: center;

  height: 100%;
  overflow-y: auto;
`

const DevicesPage = () => {
    const dispatch = useAppDispatch();
    const { devices, isLoading } = useTypedSelector(state => state.devices);

    useEffect(() => {
        const token = localStorage.getItem(TOKEN_KEY);
        dispatch(devicesActions.fetchDevices(token ?? '')); // TODO временно
    }, [])

    const devicesCards = devices.map(device => <DeviceCard key={ device.id } device={device}></DeviceCard>)

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
            <DevicesFilter/>

            <DeviceCardsContainer className='devices-cards-container'>
                { devicesCards }
            </DeviceCardsContainer>
        </DevicesPageContainer>
    );
};

export default DevicesPage;

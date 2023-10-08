'use client'
import React from 'react';
import { Card, Divider, Layout, Row, Switch, Typography } from "antd";
import { useAppDispatch, useTypedSelector } from "@/hooks";
import { EThemes } from "@/constants";
import { settingsActions } from "@/redux/features/settings.slice";


const AdminSettings = () => {
    const { theme } = useTypedSelector(state => state.settings)
    const dispatch = useAppDispatch();

    const changeTheme = () => {
        dispatch(settingsActions.setTheme(theme === EThemes.LIGHT ? EThemes.DARK : EThemes.LIGHT));
    }

    const { Text, Title } = Typography;

    return (
        <Layout style={{ margin: 21 }}>
            <Card>
                <Title level={ 3 }>Settings</Title>

                <Divider style={ { borderColor: '#141414FF', marginTop: 4 } } orientation="left">
                    <Title level={ 4 }>Theme</Title>
                </Divider>

                <Row justify={ "space-between" } align={ "middle" }>
                    <Text style={ { fontSize: '1.2rem' } }>Dark mode</Text>
                    <Switch checked={ theme === EThemes.DARK } onChange={ changeTheme }/>
                </Row>
            </Card>
        </Layout>
    );
};

export default AdminSettings;

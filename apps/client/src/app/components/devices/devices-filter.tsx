import React, { useState } from 'react';
import styled from "@emotion/styled";
import { Button, Card, Form, InputNumber, Row, Slider, Typography } from "antd";
import { useTypedSelector } from "@/hooks";

const DeviceFilterContainer = styled(Card)`
  box-shadow: rgba(0, 0, 0, 0.1) 0 4px 20px 0;
  text-align: center;
  height: max-content;
`

const {Title} = Typography

const minPriceRange = 0;
const maxPriceRange = 10000;

interface IDevicesFiltersForm {
    minPrice: number;
    maxPrice: number;
}

const initialFilterState: IDevicesFiltersForm = {
    minPrice: 100,
    maxPrice: 1000
}

const DevicesFilter = () => {
    const {isLoading} = useTypedSelector(state => state.devices);

    const [form] = Form.useForm<IDevicesFiltersForm>()
    const minPrice = Form.useWatch('minPrice', form);
    const maxPrice = Form.useWatch('maxPrice', form);
    const applyFilters = (values: IDevicesFiltersForm) => {
        console.log('IDevicesFiltersForm -> values', values)
    }

    function apply(minPrice?: number, maxPrice?: number) {
        // setPriceRange(minPrice, maxPrice)
        // loadDevices()
    }

    return (
        <DeviceFilterContainer headStyle={{fontSize: '1.2rem', fontWeight: 'lighter', letterSpacing: '1px'}}
                               title={"Filter"}>
            <Form
                layout="vertical"
                requiredMark={false}
                form={form}
                initialValues={ initialFilterState }
                onFinish={ applyFilters }>
                <Row>
                    <Title level={5}>Цена, RUB</Title>
                </Row>
                <Row justify={"space-between"}>
                    <Form.Item name='minPrice' style={{maxWidth: "45%"}}>
                        <InputNumber
                            size={"middle"}
                        />
                    </Form.Item>
                    <div><span>-</span></div>
                    <Form.Item name='maxPrice' style={{maxWidth: "45%"}}>
                        <InputNumber
                            size={"middle"}
                        />
                    </Form.Item>
                </Row>
                <Row>
                    <Slider
                        style={{width: '100%'}}
                        range
                        value={[
                            minPrice,
                            maxPrice
                        ]}
                        min={minPriceRange}
                        max={maxPriceRange}
                        onChange={value => {
                            form.setFieldValue('minPrice', value[0])
                            form.setFieldValue('maxPrice', value[1])
                        }}
                    />
                </Row>
                <Row>
                    <Button
                        loading={isLoading}
                        htmlType='submit'
                        type='primary'
                        size='large'
                        style={{width: '100%'}}
                    >Filter items   </Button>
                </Row>
            </Form>
        </DeviceFilterContainer>
    );
};

export default DevicesFilter;

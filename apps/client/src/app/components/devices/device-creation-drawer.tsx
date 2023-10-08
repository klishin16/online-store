import React from 'react';
import { Button, Col, Drawer, Form, Input, InputNumber, Row, Select, Space, Upload } from 'antd';
import { useAppDispatch, useRequest, useTypedSelector } from "@/hooks";
import { devicesActions } from "@/redux/features/devices.slice";
import { BACKEND_URL, TOKEN_KEY } from "@/constants";
import { UploadOutlined } from "@ant-design/icons";
import { IDrawerCloseParams } from "@/types";
import { IDeviceCreationDto } from "@/models";
import { BrandsService, CategoriesService } from "@/services";
import { addNotification } from "@/redux/features/notifications.slice";
import { errorHandler } from "@/functions/error-handler";


interface IDeviceCreationDrawerProps {
    open: boolean;
    onClose: (params?: IDrawerCloseParams) => void;
}

interface IDeviceForm {
    name: string;
    price: number;
    availability: number;
    sale: number;
    brandId: number;
    categoryId: number;
    image_raw: Array<{ response: { filename: string } }>
}

const DeviceCreationDrawer: React.FC<IDeviceCreationDrawerProps> = ({ open, onClose }) => {
    const dispatch = useAppDispatch();
    const { token } = useTypedSelector(state => state.auth);

    const [form] = Form.useForm<IDeviceForm>();

    const submitForm = (values: IDeviceForm) => {
        const payload: IDeviceCreationDto = {
            name: values.name,
            price: values.price,
            sale: values.sale,
            availability: values.availability,
            brandId: values.brandId,
            categoryId: values.categoryId,
            image_url: values.image_raw[0].response.filename
        }
        console.log('payload', payload)

        const token = localStorage.getItem(TOKEN_KEY);
        if (!token) {
            return;
        }
        dispatch(devicesActions.createDevice({ token, payload })).unwrap().then(() => {
            onClose({ refreshItems: true });
        })
    }

    const [brandsOptions] = useRequest(() =>
        BrandsService.fetchAll(token!)
            .then((brands) => brands.map(brand => ({
                value: brand.id,
                label: brand.name
            })))
            .catch((error) => {
                dispatch(
                    addNotification({
                        title: 'Brands loading error',
                        message: errorHandler(error),
                        type: 'error'
                    })
                );

                return []
            })
    )

    const [categoriesOptions] = useRequest(() =>
        CategoriesService.fetchAll(token!)
            .then((categories) => categories.map(category => ({
                value: category.id,
                label: category.name
            })))
            .catch((error) => {
                dispatch(
                    addNotification({
                        title: 'Categories loading error',
                        message: errorHandler(error),
                        type: 'error'
                    })
                );

                return []
            })
    )

    const normFile = (e: any) => {
        console.log('Upload event:', e);
        if (Array.isArray(e)) {
            return e;
        }
        return e?.fileList
    };

    return (
        <Drawer
            title="Create new device"
            width={ 320 }
            onClose={ () => onClose() }
            open={ open }
            bodyStyle={ { paddingBottom: 80 } }
            extra={
                <Space>
                    <Button type="primary" htmlType="submit" onClick={() => form.submit()}>
                        Submit
                    </Button>
                </Space>
            }
        >
            <Form
                layout="vertical"
                requiredMark={false}
                form={form}
                onFinish={ submitForm }>
                <Row>
                    <Col span={ 24 }>
                        <Form.Item
                            name="name"
                            label="Name"
                            rules={ [{ required: true, message: 'Please enter user name' }] }
                        >
                            <Input placeholder="Please enter user name"/>
                        </Form.Item>
                    </Col>
                </Row>
                <Row>
                    <Col span={ 24 }>
                        <Form.Item
                            name="price"
                            label="Price"
                            rules={ [{ required: true, message: 'Please enter device price' }] }
                        >
                            <InputNumber placeholder="Please enter device price" style={ { width: '100%' } } />
                        </Form.Item>
                    </Col>
                </Row>
                <Row>
                    <Col span={ 24 }>
                        <Form.Item
                            name="sale"
                            label="Sale"
                            rules={ [{ required: true, message: 'Please enter device sale' }] }
                        >
                            <InputNumber placeholder="Please enter device sale" style={{ width: '100%' }} />
                        </Form.Item>
                    </Col>
                </Row>
                <Row>
                    <Col span={ 24 }>
                        <Form.Item
                            name="availability"
                            label="Availability"
                            rules={ [{ required: true, message: 'Please enter device availability' }] }
                        >
                            <InputNumber placeholder="Please enter device availability"  style={{ width: '100%' }} />
                        </Form.Item>
                    </Col>
                </Row>
                <Row>
                    <Col span={ 24 }>
                        <Form.Item
                            name="brandId"
                            label="Brand"
                        >
                            <Select options={ brandsOptions ?? [] }></Select>
                        </Form.Item>
                    </Col>
                </Row>
                <Row>
                    <Col span={ 24 }>
                        <Form.Item
                            name="categoryId"
                            label="Category"
                        >
                            <Select options={ categoriesOptions ?? [] }></Select>
                        </Form.Item>
                    </Col>
                </Row>
                <Row>
                    <Col span={ 24 }>
                        <Form.Item
                            name="image_raw"
                            label="Upload"
                            valuePropName="fileList"
                            getValueFromEvent={normFile}
                            extra="Upload device image"
                        >
                            <Upload name="image" action={ BACKEND_URL + 'files/upload' } listType="picture">
                                <Button icon={<UploadOutlined />}>Click to upload</Button>
                            </Upload>
                        </Form.Item>
                    </Col>
                </Row>
            </Form>
        </Drawer>
    );
};

export default DeviceCreationDrawer;
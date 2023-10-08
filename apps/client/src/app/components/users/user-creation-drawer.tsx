import React from 'react';
import { Button, Col, Drawer, Form, Input, Row, Select, Space } from 'antd';
import { useAppDispatch } from "@/hooks";
import { TOKEN_KEY } from "@/constants";
import { ICreationDrawerProps } from "@/types";
import { addNotification } from "@/redux/features/notifications.slice";
import { errorHandler } from "@/functions/error-handler";
import { UsersService } from "@/services";
import { EUserRoles } from "@/models";


interface IUserForm {
    email: string;
    password: string;
    role: EUserRoles;
}

const UserCreationDrawer: React.FC<ICreationDrawerProps> = ({ open, onClose }) => {
    const dispatch = useAppDispatch();

    const [form] = Form.useForm<IUserForm>();

    const submitForm = (values: IUserForm) => {
        console.log(values);
        const token = localStorage.getItem(TOKEN_KEY);
        if (!token) {
            return;
        }
        UsersService.create(token!, values)
            .then(() => {
                dispatch(
                    addNotification({
                        title: 'User',
                        message: 'User created successfully',
                        type: 'success',
                    })
                );
                onClose({ refreshItems: true });
            })
            .catch((error) => {
                dispatch(
                    addNotification({
                        title: 'User creation error',
                        message: errorHandler(error),
                        type: 'error'
                    })
                );
            })
    }

    return (
        <Drawer
            title="Create new user"
            width={ 320 }
            onClose={ () => onClose() }
            open={ open }
            bodyStyle={ { paddingBottom: 80 } }
            extra={
                <Space>
                    <Button type="primary" htmlType="submit" onClick={ () => form.submit() }>
                        Create
                    </Button>
                </Space>
            }
        >
            <Form
                layout="vertical"
                requiredMark={ false }
                form={ form }
                onFinish={ submitForm }>
                <Row>
                    <Col span={ 24 }>
                        <Form.Item
                            name="email"
                            label="Email"
                            rules={ [
                                {
                                    type: 'email',
                                    message: 'The input is not valid email!',
                                },
                                {
                                    required: true,
                                    message: 'Please input your email!',
                                },
                            ] }
                        >
                            <Input placeholder="Please enter user email"/>
                        </Form.Item>
                    </Col>
                </Row>
                <Row>
                    <Col span={ 24 }>
                        <Form.Item
                            name="password"
                            label="Password"
                            rules={ [{ required: true, message: 'Please enter user password' }] }
                        >
                            <Input.Password placeholder="Please enter user password"/>
                        </Form.Item>
                    </Col>
                </Row>
                <Row>
                    <Col span={ 24 }>
                        <Form.Item
                            name="roles"
                            label="User roles"
                        >
                            <Select options={ Object.entries(EUserRoles).map(([label, value]) => ({
                                label,
                                value
                            })) }></Select>
                        </Form.Item>
                    </Col>
                </Row>
            </Form>
        </Drawer>
    );
};

export default UserCreationDrawer;
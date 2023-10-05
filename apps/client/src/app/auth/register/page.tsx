'use client'
import styled from "@emotion/styled";
import { Button, Card, Form, Input, notification } from "antd";
import { IRegisterPayload } from "@/types";
import { useAppDispatch, useTypedSelector } from "@/hooks";
import { register } from "@/redux/features/auth.slice";
import { LockOutlined, MailOutlined, UserOutlined } from "@ant-design/icons";
import React from "react";
import Link from "next/link";

const RegisterPageWrapper = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`

const RegistrationCard = styled(Card)`
  width: 300px;
  display: flex;
  flex-direction: column;
`

const RegisterPage = () => {
    const { isLoading } = useTypedSelector(state => state.auth);
    const dispatch = useAppDispatch();

    const submitForm = (data: IRegisterPayload) => {
        console.log(data)
        const payload: IRegisterPayload = {
            email: data.email,
            password: data.password
        }

        dispatch(register(payload))
    };


    return (
        <RegisterPageWrapper>
            <RegistrationCard title="React store"
                              headStyle={ { display: "flex", justifyContent: "center", fontSize: "1.6rem" } }
                              bordered={ true }
            >
                <Form
                    name="normal_login"
                    className="login-form"
                    initialValues={ { remember: true } }
                    onFinish={ submitForm }
                >
                    <Form.Item
                        name="email"
                        rules={ [{ required: true, message: 'Please input your Email!' }] }
                    >
                        <Input prefix={ <MailOutlined/> } placeholder="Email"/>
                    </Form.Item>
                    <Form.Item
                        name="password"
                        rules={ [{ required: true, message: 'Please input your Password!' }] }
                    >
                        <Input
                            prefix={ <LockOutlined className="site-form-item-icon"/> }
                            type="password"
                            placeholder="Password"
                        />
                    </Form.Item>

                    <Form.Item noStyle>
                        <Button type="primary" htmlType="submit" className="login-form-button" loading={ isLoading }>
                            Register
                        </Button>
                        <span style={ { marginLeft: '8px' } }>Or <Link href="/auth/login/">login!</Link></span>
                    </Form.Item>
                </Form>
            </RegistrationCard>
        </RegisterPageWrapper>
    );
};

export default RegisterPage;

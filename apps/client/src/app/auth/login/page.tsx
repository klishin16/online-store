'use client'
import React from 'react';
import { Button, Card, Checkbox, Form, Input } from "antd";
import { LockOutlined, MailOutlined } from "@ant-design/icons";
import { useAppDispatch, useTypedSelector } from "@/hooks";
import styled from "@emotion/styled";
import { login } from "@/redux/features/auth.slice";
import { ILoginPayload } from "@/types";
import { useRouter, useSearchParams } from 'next/navigation'
import Link from "next/link";
import { ERoutes } from "@/constants";


const LoginPageContainer = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: linear-gradient(180deg, #a0d7e7, #6c5dd3);
`

const LoginCard = styled(Card)`
  width: 300px;
  display: flex;
  flex-direction: column;
`

interface LoginFormData {
    email: string;
    password: string;
    remember: boolean
}

const LoginPage = () => {
    const { isLoading } = useTypedSelector(state => state.auth);
    const dispatch = useAppDispatch()
    const searchParams = useSearchParams()
    const router = useRouter()

    const submitForm = (data: LoginFormData) => {
        console.log(data)
        const loginDto: ILoginPayload = {
            email: data.email,
            password: data.password,
        }

        dispatch(login(loginDto)).then(() => {
            router.push(searchParams.get('continue') ?? ERoutes.DEVICES)
        })
    };

    return (
        <LoginPageContainer>
            <LoginCard title="React store"
                       headStyle={ { display: "flex", justifyContent: "center", fontSize: "1.6rem" } }
                       bordered={ true }
            >
                <Form
                    name="login_form"
                    initialValues={ { remember: true } }
                    onFinish={ submitForm }
                >
                    {/* Email input */ }
                    <Form.Item
                        name="email"
                        rules={ [{ required: true, message: 'Please enter your email' }] }
                    >
                        <Input
                            prefix={ <MailOutlined /> }
                            placeholder='Email'
                        />
                    </Form.Item>

                    {/* Password input */ }
                    <Form.Item
                        name="password"
                        rules={ [{ required: true, message: 'Please input your Password!' }] }
                    >
                        <Input
                            prefix={ <LockOutlined/> }
                            placeholder='Password'
                            type='password'
                        />
                    </Form.Item>

                    {/* Remember input */ }
                    <Form.Item
                        name="remember"
                        valuePropName="checked"
                    >
                        <Checkbox>Remember me</Checkbox>
                    </Form.Item>

                    <Form.Item noStyle>
                        <Button
                            type="primary"
                            htmlType="submit"
                            loading={ isLoading }
                        >
                            Log in
                        </Button>
                        <span style={{ marginLeft: '8px' }}>Or <Link href="/auth/register">register now!</Link></span>
                    </Form.Item>
                </Form>
            </LoginCard>
        </LoginPageContainer>
    );
};

export default LoginPage;

"use client";
import React, { useContext } from "react";
import { Button, Card, Checkbox, Form, Input } from "antd";
import { loginUser } from "@/utils";
import { Context } from "@/app/layout";

type FieldType = {
  username?: string;
  password?: string;
  remember?: string;
};

export const Login: React.FC = () => {
  const {setIsLogin } = useContext(Context);

  const onFinish = async (values: any) => {
    try {
      const token = await loginUser(values.username, values.password);
      setIsLogin(token.token);
      localStorage.setItem("user", token.token);
      localStorage.setItem("name", values.username);
    } catch (err) {
      alert("something went wrong");
    }
  };
  const onFinishFailed = (errorInfo: any) => {
    alert("something went wrong");
  };
  return (
    <div
      style={{
        display: "flex",
        height: 600,
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <h3>Login</h3>
      <Card
        bordered={true}
        style={{
          width: 700,
          paddingTop: 50,
        }}
      >
        <Form
          name="basic"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          style={{ width: 600 }}
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item<FieldType>
            label="Username"
            name="username"
            initialValue={"kgk_user"}
            rules={[
              {
                required: true,
                message: "Please input your correct username!",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item<FieldType>
            label="Password"
            name="password"
            initialValue={"xKcD!"}
            rules={[{ required: true, message: "Please input your password!" }]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item<FieldType>
            name="remember"
            valuePropName="checked"
            wrapperCol={{ offset: 8, span: 16 }}
          >
            <Checkbox>Remember me</Checkbox>
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button type="primary" htmlType="submit">
              Login
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

import { Form } from "antd";
import Button from "antd/lib/button";
import Input from "antd/lib/input";
import { useAuth } from "context/auth-context";
import React from "react";
import { LongButton } from "unauthenticated-app";

export const LoginScreen = () => {
  const { user, login } = useAuth();
  const handleSubmit = (value: { username: string; password: string }) => {
    login(value);
  };
  // const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
  //   event.preventDefault(); //1. 阻止表单提交在页面中有表单时，输入完表单内容后通过点击提交按钮完成数据的提交，但如果没有输入任何内容，那么默认情况下点击提交按钮会导致整个页面重新加载，这就需要使用JS阻止默认行为。
  //   const username = (event.currentTarget.elements[0] as HTMLInputElement)
  //     .value; //as HTMLInputElement:不加会报错类型“Element”上不存在属性“value”。
  //   const password = (event.currentTarget.elements[1] as HTMLInputElement)
  //     .value;
  //   login({ username, password });
  // };

  return (
    <Form onFinish={handleSubmit}>
      <Form.Item
        name="username"
        rules={[{ required: true, message: "请输入用户名~" }]}
      >
        <Input placeholder={"用户名"} type="text" id={"username"}></Input>
      </Form.Item>
      <Form.Item
        name="password"
        rules={[{ required: true, message: "请输入密码~" }]}
      >
        <Input placeholder={"密码"} type="password" id={"password"}></Input>
      </Form.Item>
      <Form.Item>
        <LongButton htmlType="submit" type="primary">
          登录
        </LongButton>
      </Form.Item>
    </Form>
  );
};

export default LoginScreen;

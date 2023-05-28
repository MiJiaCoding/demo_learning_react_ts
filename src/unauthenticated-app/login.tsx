import { useAuth } from "context/auth-context";
import React from "react";

export const LoginScreen = () => {
  const { user, login } = useAuth();
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault(); //1. 阻止表单提交在页面中有表单时，输入完表单内容后通过点击提交按钮完成数据的提交，但如果没有输入任何内容，那么默认情况下点击提交按钮会导致整个页面重新加载，这就需要使用JS阻止默认行为。
    const username = (event.currentTarget.elements[0] as HTMLInputElement)
      .value; //as HTMLInputElement:不加会报错类型“Element”上不存在属性“value”。
    const password = (event.currentTarget.elements[1] as HTMLInputElement)
      .value;
    login({ username, password });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="username">用户名</label>
        <input type="text" id={"username"}></input>
      </div>
      <div>
        <label htmlFor="password">密码</label>
        <input type="password" id={"password"}></input>
      </div>
      <button type={"submit"}>登录</button>
    </form>
  );
};

export default LoginScreen;

import React from "react";
const apiUrl = process.env.REACT_APP_API_URL;

export const LoginScreen = () => {
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const username = (event.currentTarget.elements[0] as HTMLInputElement)
      .value; //as HTMLInputElement:不加会报错类型“Element”上不存在属性“value”。
  };
  fetch(`${apiUrl}/login}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  }).then(async (response) => {
    if (response.ok) {
    }
  });

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

import React, { useState } from "react";
import LoginScreen from "./login";
import RegisterScreen from "./register";

export const UnauthenticatedApp = () => {
  const [isRegister, setIsRegister] = useState(false); // 默认是登陆界面
  return (
    <div>
      {isRegister ? <RegisterScreen /> : <LoginScreen />}
      <button onClick={() => setIsRegister(!isRegister)}>
        切换到{isRegister ? "登陆" : "注册"}
      </button>
    </div>
  );
};

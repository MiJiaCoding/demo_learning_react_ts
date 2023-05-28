import React, { ReactNode, useState } from "react";
import * as auth from "auth-provider";
import { User } from "screens/projectList/SearchPanel";
import { http } from "utils/http";
import { useMount } from "utils";

interface AuthForm {
  username: string;
  password: string;
}

// 作用：去localstorage中找token，拿着token去获得user星系
const bootstrapUser = async () => {
  //初始化user （页面刷新的时候保持登陆

  let user = null;
  const token = auth.getToken();
  if (token) {
    const data = await http("me", { token });
    user = data.user;
  }
  return user;
};

const AuthContext = React.createContext<
  | {
      user: User | null;
      login: (form: AuthForm) => Promise<void>;
      register: (form: AuthForm) => Promise<void>;
      logout: () => Promise<void>;
    }
  | undefined
>(undefined);
AuthContext.displayName = "AuthContext";

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  const login = (form: AuthForm) =>
    auth.login(form).then((user) => setUser(user)); //调用后端api

  const register = (form: AuthForm) =>
    // point free //等价于user => s etUser(user)
    auth.register(form).then(setUser);
  const logout = () => auth.logout().then((user) => setUser(null));

  useMount(() => {
    // 保持登陆，页面刷新也能获取user信，防止需要重新登陆
    bootstrapUser().then(setUser);
  });

  return (
    <AuthContext.Provider
      children={children}
      value={{ user, login, register, logout }}
    ></AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = React.useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth必须在AuthProvider中使用");
  }
  return context;
};

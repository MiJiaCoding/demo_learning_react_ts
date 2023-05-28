import qs from "qs";
import * as auth from "auth-provider";
import { useAuth } from "context/auth-context";
const apiUrl = process.env.REACT_APP_API_URL;
interface Config extends RequestInit {
  //RequestInit 是fetch 第二参数的api接口
  token?: string;
  data?: object;
}
export const http = async (
  endpoint: string,
  { data, token, headers, ...customConfig }: Config = {} //默认参数 使得Config变成可选
) => {
  const config = {
    method: "GET",
    headers: {
      Authorization: token ? `Bearer ${token}` : "",
      "Content-Type": data ? "application/json" : "",
    },
    ...customConfig,
  };
  // 由于...customConfig卸载method 后面，所以你传入的POST、patch等 可以覆盖method ,

  /*GET请求里，我们所传的参数在fetch API里是要带到URL里的
  而 POST PATCH DELETE等 ，是直接放在body里面的
  下面我们对参数进行处理
  */
  if (config.method.toUpperCase() === "GET") {
    endpoint += `?${qs.stringify(data)}`;
  } else {
    config.body = JSON.stringify(data || {});
  }
  return window
    .fetch(`${apiUrl}/${endpoint}`, config)
    .then(async (response) => {
      if (response.status === 401) {
        // (restAPI规范)token失效 或者未登录的情况
        // 退出登录
        await auth.logout();
        window.location.reload();
        return Promise.reject({ message: "请重新登陆哦~" });
      }
      const data = await response.json();
      if (response.ok) {
        return data;
      } else {
        return Promise.reject(data);
      }
    });
};

export const useHttp = () => {
  const { user } = useAuth();
  return (...[endpoint, config]: Parameters<typeof http>) =>
    http(endpoint, { ...config, token: user?.token });
};

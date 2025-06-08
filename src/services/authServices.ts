import type { User, UserLoginModel } from '../models/user/userModel';
import api from '../utils/apiClient';
import { SetCookie } from '../utils/cookieHelper';


export const Login = async (model: UserLoginModel): Promise<User> => {
  try {
    const res = await api.post("user/login", model,);
    const data = res.data;

    const user = await GetLoginUserInfo(data.accessToken);
    SetCookie("token", data.accessToken, 30);
    SetCookie("userInfo", JSON.stringify(user), 30);
    return user
  } catch (error) {
    console.error("Failed to get user info:", error);
    return { id: 0 };
  }
};

export const GetLoginUserInfo = async (
  accessToken: string
): Promise<User> => {
  try {
    const res = await api.get<User>("/user/me", {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    return res.data;
  } catch (error) {
    console.error("Failed to get user info:", error);
    return { id: 0 };
  }
};
  

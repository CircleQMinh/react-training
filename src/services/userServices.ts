import type { User, UserInformation } from "../models/user/userModel";
import api from "../utils/apiClient";

export const GetUserInfo = async (id: string): Promise<User> => {
  try {
    const res = await api.get<User>(`/user/${id}`, {});

    return res.data;
  } catch (error) {
    console.error("Failed to get user info:", error);
    return { id: 0 };
  }
};

export const UpdateUserInfo = async (id:string ,user: UserInformation): Promise<User> => {
    try {
      const res = await api.put<User>(`/user/${id}`, user);
  
      return res.data;
    } catch (error) {
      console.error("Failed to get user info:", error);
      return { id: 0 };
    }
  };
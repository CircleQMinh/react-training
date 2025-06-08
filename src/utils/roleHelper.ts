import type { User } from "../models/user/userModel"

export const IsOfficer = (user:User):boolean =>{
    const role = user.role ?? ""
    if(role == "admin" || role == "moderator"){
        return true;
    }
    return false;
}
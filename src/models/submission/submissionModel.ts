import type { UserSubmissionStatus, UserSubmissionType } from "../../utils/constant";
import type { UserInformation } from "../user/userModel";

export interface UserSubmission{
    id: number,
    name:string,
    date: Date,
    type: UserSubmissionType,
    info: UserInformation,
    status: UserSubmissionStatus,
    age: number
}

import { useContext, useEffect, useState } from 'react';
import { AuthenticatedContext } from '../../shared/Authenticated.tsx';
import ProfileForm from './ProfileForm.tsx';
import { IsOfficer } from '../../utils/roleHelper.ts';
import { useNavigate, useParams } from 'react-router-dom';
import { GetUserInfo } from '../../services/userServices.ts';
import type { User } from '../../models/user/userModel.ts';
type UserProfilePageProps = {
    IsEdit:boolean
}
const UserProfilePage = (props:UserProfilePageProps) => {
    const isEdit = props.IsEdit
    const auth = useContext(AuthenticatedContext);
    const navigate = useNavigate();
    const user = auth?.user
    const { id } = useParams<{ id: string }>();
    const [info, setInfo] = useState<User|null>(null)

    useEffect(() => {
        if(IsOfficer(user!) && props.IsEdit){
            navigate(`/pages/users/${id}/details`);
        }
        async function fetchData() {
           const data = await GetUserInfo(id ?? "1");
           setInfo(data)
        }
        fetchData();
      }, [isEdit]); 

      useEffect(() => {

      }, [info])
      
    return (<ProfileForm IsEdit={props.IsEdit} Data={info}></ProfileForm>)
}

export default UserProfilePage

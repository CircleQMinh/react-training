import KycForm from './KycForm.tsx';
import { useContext, useEffect, useState } from 'react';
import { AuthenticatedContext } from '../../shared/Authenticated.tsx';
import { IsOfficer } from '../../utils/roleHelper.ts';
import { useNavigate, useParams } from 'react-router-dom';
import { GetUserInfo } from '../../services/userServices.ts';
import type { User } from '../../models/user/userModel.ts';

const UserKYCPage = () => {

    const auth = useContext(AuthenticatedContext);
    const navigate = useNavigate();
    const user = auth?.user
    const isEdit = !IsOfficer(user!)
    const { id } = useParams<{ id: string }>();
    const [info, setInfo] = useState<User|null>(null)

    useEffect(() => {
        async function fetchData() {
           const data = await GetUserInfo(id ?? "1");
           setInfo(data)
        }
        fetchData();
      }, [isEdit]); 
    return (<KycForm IsEdit={isEdit} Data={info}></KycForm>)
}

export default UserKYCPage

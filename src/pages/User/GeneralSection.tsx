import { type FieldErrors, type UseFormRegister, type UseFormSetValue } from 'react-hook-form';
import type { User, UserInformation } from '../../models/user/userModel';
import { useEffect } from 'react';
import { convertDDMMYYYtoAge, convertToDDMMYYYY } from '../../utils/stringHelper';


type FormData = {
    firstName: string;
    lastName: string;
    country: string;
    city: string;
    address: string;
    email: string;
    phoneNumber: string;
    birthday: string;
    organization: string;
    role: string;
    department: string;
    zipCode: string;
};

interface GeneralInfoFieldsProps {
    register: UseFormRegister<any>;
    setValue: UseFormSetValue<any>;
    errors: FieldErrors<any>;
    isEdit? : boolean,
    data? : User|null
}

interface GeneralInfoFields {
    label: string;
    short:string
    name: string;
    type: string;
    placeholder: string;
    value?: string;
    rule?: any
}


export default function GeneralSection({register,setValue, errors, isEdit, data}: GeneralInfoFieldsProps) {
    const readOnly = !isEdit
    const handleDobChange = (e) => {
        const value = e.target.value;
        const isValid = /^\d{2}\/\d{2}\/\d{4}$/.test(value);
        if (!isValid) {
          setValue('age', '');
          return;
        }
    
        const [day, month, year] = value.split('/').map(Number);
        const dob = new Date(year, month - 1, day);
    
        // Check for valid date object
        if (
          dob.getDate() !== day ||
          dob.getMonth() !== month - 1 ||
          dob.getFullYear() !== year
        ) {
          setValue('age', '');
          return;
        }
    
        // Calculate age
        const today = new Date();
        let age = today.getFullYear() - dob.getFullYear();
        const m = today.getMonth() - dob.getMonth();
        if (m < 0 || (m === 0 && today.getDate() < dob.getDate())) {
          age--;
        }
    
        setValue('age', age.toString());
      };
    const fields: GeneralInfoFields[] = [
        {label: 'First Name',short:"firstName" ,name: 'basic.firstName', type: 'text', placeholder: 'Enter First Name',value: data?.firstName, rule: { required: `First Name is required` }},
        {label: 'Last Name',short:"lastName",  name: 'basic.lastName', type: 'text', placeholder: 'Enter Last Name',value: data?.lastName, rule: { required: `Last Name is required` }},
        {label: 'Middle Name',short:"middleName",  name: 'basic.middleName', type: 'text', placeholder: 'Enter Middle Name',value: "", rule: { required: false }},
        {label: 'Date of Birth',short:"dob",  name: 'basic.dob', type: 'text', placeholder: '15/08/1990',value: convertToDDMMYYYY(data?.birthDate), rule: {
            required: 'Date is required',
            pattern: {
              value: /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/,
              message: 'Date must be in DD/MM/YYYY format',
            },
            onChange:(e)=>{
                handleDobChange(e)
            }
          }},
        {label: 'Age',short:"age" , name: 'age', type: 'text', placeholder: 'Age',value: convertDDMMYYYtoAge(convertToDDMMYYYY(data?.birthDate)).toString(), rule:{readOnly: true,required:false}},
    ]

    useEffect(() => {
        fields.forEach(field => {
          if (field.value !== undefined && field.value !== "0") {
            setValue(field.name, field.value);
          }
        });
      }, [data]);

    return (
        <>
        <div
            className="p-4 mb-4 bg-white border border-gray-200 rounded-lg shadow-sm 2xl:col-span-2 dark:border-gray-700 sm:p-6 dark:bg-gray-800">
            <h3 className="mb-4 text-xl font-semibold dark:text-white">Basic information</h3>
            <div className="grid grid-cols-6 gap-6">
                {fields.map((field,index) => (
                    <div key={field.name} className="col-span-6 sm:col-span-3">
                        <label
                            htmlFor={field.name}
                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >
                            {field.label}
                        </label>
                        <input
                            readOnly = {readOnly || field.name == "age"}
                            id={field.name}
                            type={field.type}
                            placeholder={field.placeholder}
                            className={`shadow-sm bg-gray-50 bordertext-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500`}
                            {...register(field.name, field.rule)}
                        />
                        {errors.basic && errors.basic[field.short] && (
                            <p className="text-red-500 text-sm mt-1">
                                {String(errors.basic[field.short]?.message)}
                            </p>
                        )}
                    </div>
                ))}              
            </div>
        </div>
        </>
    );
}

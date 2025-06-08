import {
  type FieldArrayWithId,
  type FieldErrors,
  type UseFormRegister,
  type UseFormSetValue,
} from "react-hook-form";
import { useEffect } from "react";
import { EmailTypeEnum } from "../../utils/constant";
import type { UserInformation } from "../../models/user/userModel";

interface EmailsSectionFieldsProps {
  register: UseFormRegister<any>;
  setValue: UseFormSetValue<any>;
  errors: FieldErrors<UserInformation>;
  fields: FieldArrayWithId<UserInformation>[];
  append: any;
  remove: any;
  isEdit?: boolean;
  data?: UserInformation | null;
}

export default function EmailsSection({
  register,
  setValue,
  errors,
  fields,
  append,
  remove,
  isEdit,
  data,
}: EmailsSectionFieldsProps) {
  const readOnly = !isEdit;
  useEffect(() => {
    if (data?.emails) {
      data.emails.forEach((addr, idx) => {
        setValue(`emails.${idx}.email`, addr.email);
        setValue(`emails.${idx}.preferred`, addr.preferred);
        setValue(`emails.${idx}.type`, addr.type ?? EmailTypeEnum.Personal);
      });
    }
  }, [data, setValue]);
  useEffect(() => {
  }, [])
  
  return (
    <div className="p-4 mb-4 bg-white border border-gray-200 rounded-lg shadow-sm dark:border-gray-700 sm:p-6 dark:bg-gray-800">
      <h3 className="mb-4 text-xl font-semibold dark:text-white">Emails</h3>

      {fields.map((field, index) => (
        <div
          key={field.id}
          className="grid grid-cols-6 gap-6 border-b pb-4 mb-4"
          aria-description={field.id}
        >
          <div className="col-span-6 sm:col-span-3">
            <label
              htmlFor={`emails.${index}.email`}
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Email
            </label>
            <input
              readOnly={readOnly}
              {...register(`emails.${index}.email`, { required: true,pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: "Invalid email address",
              }})}
              placeholder="example@gmail.com"
              className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
            />
            {errors["emails"]?.[index]?.email && (
              <p className="text-red-500 text-sm mt-1">
                {errors["emails"]?.[index].email?.message ||
                  "This is required"}
              </p>
            )}
          </div>

          <div className="col-span-6 sm:col-span-3">
            <label
              htmlFor={`emails.${index}.type`}
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Type
            </label>
            <select
              disabled={readOnly}
              {...register(`emails.${index}.type`, { required: true })}
              className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
            >
              <option value={EmailTypeEnum.Personal}>Personal</option>
              <option value={EmailTypeEnum.Work}>Work</option>
            </select>
          </div>

          <div className="col-span-6 sm:col-span-3">
            <label
              htmlFor={`emails.${index}.preferred`}
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Preferred
            </label>
            <select
              disabled={readOnly}
              {...register(`emails.${index}.preferred`, { required: true })}
              className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
            >
              <option value={"true"}>Yes</option>
              <option value={"false"}>No</option>
            </select>
          </div>

          {isEdit && (
            <div className="col-span-6 sm:col-span-3 flex items-end">
              <button
                type="button"
                onClick={() => remove(index)}
                className="text-red-600 text-sm hover:underline"
              >
                Remove Email
              </button>
            </div>
          )}
        </div>
      ))}

      {isEdit && (
        <button
          type="button"
          onClick={() =>
            append({
                email: "",
                preferred: true,
                type: EmailTypeEnum.Personal,
              })
          }
          className="bg-blue-600 text-white px-4 py-2 rounded text-sm"
        >
          Add Email
        </button>
      )}
    </div>
  );
}

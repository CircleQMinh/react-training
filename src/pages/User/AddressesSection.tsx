import {
  type FieldArrayWithId,
  type FieldErrors,
  type UseFormRegister,
  type UseFormSetValue,
} from "react-hook-form";
import { useEffect } from "react";
import { AddressTypeEnum } from "../../utils/constant";
import type { UserInformation } from "../../models/user/userModel";

interface AddressesSectionFieldsProps {
  register: UseFormRegister<any>;
  setValue: UseFormSetValue<any>;
  errors: FieldErrors<UserInformation>;
  fields: FieldArrayWithId<UserInformation, "addresses", "id">[];
  append: any;
  remove: any;
  isEdit?: boolean;
  data?: UserInformation | null;
}

export default function AddressesSection({
  register,
  setValue,
  errors,
  fields,
  append,
  remove,
  isEdit,
  data,
}: AddressesSectionFieldsProps) {
  const readOnly = !isEdit;
  useEffect(() => {
    // if (data?.addresses) {
    //   data.addresses.forEach((addr, idx) => {
    //     setValue(`addresses.${idx}.country`, addr.country);
    //     setValue(`addresses.${idx}.city`, addr.city);
    //     setValue(`addresses.${idx}.street`, addr.street);
    //     setValue(`addresses.${idx}.postalcode`, addr.postalcode);
    //     setValue(`addresses.${idx}.type`, addr.type ?? AddressTypeEnum.Mailing);
    //   });
    // }
  }, [data, setValue]);
  useEffect(() => {
  //  append()
  }, [fields,data])
  
  return (
    <div className="p-4 mb-4 bg-white border border-gray-200 rounded-lg shadow-sm dark:border-gray-700 sm:p-6 dark:bg-gray-800">
      <h3 className="mb-4 text-xl font-semibold dark:text-white">Addresses</h3>

      {fields.map((field, index) => (
        <div
          key={field.id}
          className="grid grid-cols-6 gap-6 border-b pb-4 mb-4"
          aria-description={field.id}
        >
          <div className="col-span-6 sm:col-span-3">
            <label
              htmlFor={`addresses.${index}.country`}
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Country
            </label>
            <input
              readOnly={readOnly}
              {...register(`addresses.${index}.country`, { required: true })}
              placeholder="United States"
              className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
            />
            {errors["addresses"]?.[index]?.country && (
              <p className="text-red-500 text-sm mt-1">
                {errors["addresses"]?.[index].country?.message ||
                  "This is required"}
              </p>
            )}
          </div>

          <div className="col-span-6 sm:col-span-3">
            <label
              htmlFor={`addresses.${index}.city`}
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              City
            </label>
            <input
              readOnly={readOnly}
              {...register(`addresses.${index}.city`, { required: true })}
              placeholder="e.g. San Francisco"
              className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
            />
            {errors["addresses"]?.[index]?.city && (
              <p className="text-red-500 text-sm mt-1">
                {errors["addresses"]?.[index].city?.message ||
                  "This is required"}
              </p>
            )}
          </div>

          <div className="col-span-6 sm:col-span-3">
            <label
              htmlFor={`addresses.${index}.street`}
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Street
            </label>
            <input
              readOnly={readOnly}
              {...register(`addresses.${index}.street`, { required: true })}
              placeholder="e.g. California"
              className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
            />
            {errors["addresses"]?.[index]?.street && (
              <p className="text-red-500 text-sm mt-1">
                {errors["addresses"]?.[index].street?.message ||
                  "This is required"}
              </p>
            )}
          </div>

          <div className="col-span-6 sm:col-span-3">
            <label
              htmlFor={`addresses.${index}.postalcode`}
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Postal Code
            </label>
            <input
              readOnly={readOnly}
              {...register(`addresses.${index}.postalcode`, { required: true })}
              placeholder="123456"
              className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
            />
            {errors["addresses"]?.[index]?.postalcode && (
              <p className="text-red-500 text-sm mt-1">
                {errors["addresses"]?.[index].postalcode?.message ||
                  "This is required"}
              </p>
            )}
          </div>

          <div className="col-span-6 sm:col-span-3">
            <label
              htmlFor={`addresses.${index}.type`}
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Type
            </label>
            <select
              disabled={readOnly}
              {...register(`addresses.${index}.type`, { required: true })}
              className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
            >
              <option value={AddressTypeEnum.Mailing}>Mailing</option>
              <option value={AddressTypeEnum.Work}>Work</option>
            </select>
          </div>

          {isEdit && (
            <div className="col-span-6 sm:col-span-3 flex items-end">
              <button
                type="button"
                onClick={() => remove(index)}
                className="text-red-600 text-sm hover:underline"
              >
                Remove Address
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
              country: "",
              city: "",
              street: "",
              postalcode: "",
              type: AddressTypeEnum.Mailing,
            })
          }
          className="bg-blue-600 text-white px-4 py-2 rounded text-sm"
        >
          Add Address
        </button>
      )}
    </div>
  );
}

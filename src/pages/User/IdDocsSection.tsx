import {
  type FieldArrayWithId,
  type FieldErrors,
  type UseFormRegister,
  type UseFormSetValue,
} from "react-hook-form";
import { useEffect } from "react";
import { IDDocType } from "../../utils/constant";
import type { UserInformation } from "../../models/user/userModel";

interface IdDocsSectionFieldsProps {
  register: UseFormRegister<any>;
  setValue: UseFormSetValue<any>;
  errors: FieldErrors<UserInformation>;
  fields: FieldArrayWithId<UserInformation>[];
  append: any;
  remove: any;
  isEdit?: boolean;
  data?: UserInformation | null;
}

export default function IdDocsSection({
  register,
  setValue,
  errors,
  fields,
  append,
  remove,
  isEdit,
  data,
}: IdDocsSectionFieldsProps) {
  const readOnly = !isEdit;
  useEffect(() => {
    if (data?.iddocs) {
      data.iddocs.forEach((addr, idx) => {
        setValue(`iddocs.${idx}.file`, addr.file);
        setValue(`iddocs.${idx}.expiryDate`, addr.expiryDate);
        setValue(`iddocs.${idx}.type`, addr.type ?? IDDocType.IDCard);
      });
    }
  }, [data, setValue]);
  useEffect(() => {
 
  }, []);

  return (
    <div className="p-4 mb-4 bg-white border border-gray-200 rounded-lg shadow-sm dark:border-gray-700 sm:p-6 dark:bg-gray-800">
      <h3 className="mb-4 text-xl font-semibold dark:text-white">
        Identification Documents
      </h3>

      {fields.map((field, index) => (
        <div
          key={field.id}
          className="grid grid-cols-6 gap-6 border-b pb-4 mb-4"
          aria-description={field.id}
        >
          <div className="col-span-6 sm:col-span-3">
            <label
              htmlFor={`iddocs.${index}.type`}
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Type
            </label>
            <select
              disabled={readOnly}
              {...register(`iddocs.${index}.type`, { required: true })}
              className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
            >
              <option value={IDDocType.IDCard}>ID Card</option>
              <option value={IDDocType.DriverLicense}>Driver License</option>
              <option value={IDDocType.Passport}>Passport</option>
            </select>
          </div>

          <div className="col-span-6 sm:col-span-3">
            <label
              htmlFor={`iddocs.${index}.expiryDate`}
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Expiry Date
            </label>
            <input
            type="date"
              readOnly={readOnly}
              {...register(`iddocs.${index}.expiryDate`, {
                required: true,
              
              })}
              placeholder="01/01/2000"
              className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
            />
            {errors["iddocs"]?.[index]?.expiryDate && (
              <p className="text-red-500 text-sm mt-1">
                {errors["iddocs"]?.[index]?.expiryDate?.message ||
                  "This is required"}
              </p>
            )}
          </div>
            {
              !isEdit &&   <div className="col-span-6 sm:col-span-3">
              <label
                htmlFor={`iddocs.${index}.file`}
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Upload Document
              </label>
              <input
              type="text"
                readOnly= {true}
                {...register(`iddocs.${index}.file`, {
                  required: true,
                
                })}
                className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
              />
              {errors["iddocs"]?.[index]?.file && (
                <p className="text-red-500 text-sm mt-1">
                  {errors["iddocs"]?.[index]?.file?.message ||
                    "This is required"}
                </p>
              )}
            </div>
            }

          {
            isEdit &&           <div className="col-span-6 sm:col-span-3">
            <label
              htmlFor={`iddocs.${index}.file`}
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Upload Document
            </label>
            <input
            type="file"
              readOnly={readOnly}
              {...register(`iddocs.${index}.file`, {
                required: true,
              
              })}
              placeholder="01/01/2000"
              className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
            />
            {errors["iddocs"]?.[index]?.file && (
              <p className="text-red-500 text-sm mt-1">
                {errors["iddocs"]?.[index]?.file?.message ||
                  "This is required"}
              </p>
            )}
          </div>
          }


          {isEdit && (
            <div className="col-span-12 sm:col-span-3 flex items-end">
              <button
                type="button"
                onClick={() => remove(index)}
                className="text-red-600 text-sm hover:underline"
              >
                Remove Identification Document
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
              expiryDate: "",
              file: "",
              type: IDDocType.IDCard,
            })
          }
          className="bg-blue-600 text-white px-4 py-2 rounded text-sm"
        >
          Add Identification Document
        </button>
      )}
    </div>
  );
}

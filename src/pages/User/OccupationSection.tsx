import {
  type FieldArrayWithId,
  type FieldErrors,
  type UseFormRegister,
  type UseFormSetValue,
  type UseFormWatch,
} from "react-hook-form";
import { useEffect } from "react";
import { OccupationType } from "../../utils/constant";
import type { UserInformation } from "../../models/user/userModel";

interface OccupationSectionFieldsProps {
  register: UseFormRegister<any>;
  setValue: UseFormSetValue<any>;
  watch: UseFormWatch<any>,
  errors: FieldErrors<UserInformation>;
  fields: FieldArrayWithId<UserInformation>[];
  append: any;
  remove: any;
  isEdit?: boolean;
  data?: UserInformation | null;
}

export default function OccupationSection({
  register,
  setValue,
  watch,
  errors,
  fields,
  append,
  remove,
  isEdit,
  data,
}: OccupationSectionFieldsProps) {
  const readOnly = !isEdit;
  useEffect(() => {
    if (data?.occupations) {
      data.occupations.forEach((addr, idx) => {
        setValue(`occupations.${idx}.from`, addr.from);
        setValue(`occupations.${idx}.to`, addr.to);
        setValue(`occupations.${idx}.type`, addr.type ?? OccupationType.Unemployed);
      });
    }
  }, []);
  useEffect(() => {
 
  }, []);

  return (
    <div className="p-4 mb-4 bg-white border border-gray-200 rounded-lg shadow-sm dark:border-gray-700 sm:p-6 dark:bg-gray-800">
      <h3 className="mb-4 text-xl font-semibold dark:text-white">
        Occupation and Employment Information
      </h3>

      {fields.map((field, index) =>{ 
         const fromDate = watch(`occupations.${index}.from`);
        return (
        <div
          key={field.id}
          className="grid grid-cols-6 gap-6 border-b pb-4 mb-4"
          aria-description={field.id}
        >
          <div className="col-span-6 sm:col-span-3">
            <label
              htmlFor={`occupations.${index}.type`}
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Type
            </label>
            <select
              disabled={readOnly}
              {...register(`occupations.${index}.type`, { required: true })}
              className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
            >
              <option value={OccupationType.Unemployed}>Unemployed</option>
              <option value={OccupationType.Developer}>Developer</option>
              <option value={OccupationType.Tester}>Tester</option>
              <option value={OccupationType.BA}>BA</option>
            </select>
          </div>

          <div className="col-span-6 sm:col-span-3">
            <label
              htmlFor={`occupations.${index}.from`}
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              From Date
            </label>
            <input
            type="date"
              readOnly={readOnly}
              {...register(`occupations.${index}.from`, {
                required: true,
              
              })}
              placeholder="01/01/2000"
              className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
            />
            {errors["occupations"]?.[index]?.from && (
              <p className="text-red-500 text-sm mt-1">
                {errors["occupations"]?.[index]?.from?.message ||
                  "This is required"}
              </p>
            )}
          </div>

          <div className="col-span-6 sm:col-span-3">
            <label
              htmlFor={`occupations.${index}.to`}
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              To Date
            </label>
            <input
            type="date"
              readOnly={readOnly}
              {...register(`occupations.${index}.to`, {
                required: true,
                validate: (value) =>
                    !fromDate || new Date(value) >= new Date(fromDate)
                      ? true
                      : "To Date must be after From Date",
              })}
              placeholder="01/01/2000"
              className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
            />
            {errors["occupations"]?.[index]?.to && (
              <p className="text-red-500 text-sm mt-1">
                {errors["occupations"]?.[index]?.to?.message ||
                  "This is required"}
              </p>
            )}
          </div>

         


          {isEdit && (
            <div className="col-span-12 sm:col-span-3 flex items-end">
              <button
                type="button"
                onClick={() => remove(index)}
                className="text-red-600 text-sm hover:underline"
              >
                Remove Occupation 
              </button>
            </div>
          )}
        </div>
      )
      
      })}

      {isEdit && (
        <button
          type="button"
          onClick={() =>
            append({
              from: "",
              to: "",
              type: OccupationType.Unemployed,
            })
          }
          className="bg-blue-600 text-white px-4 py-2 rounded text-sm"
        >
          Add Occupation 
        </button>
      )}
    </div>
  );
}

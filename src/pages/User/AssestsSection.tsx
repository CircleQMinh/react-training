import {
  type FieldArrayWithId,
  type FieldErrors,
  type UseFormRegister,
  type UseFormSetValue,
} from "react-hook-form";
import { useEffect, useState } from "react";
import { AssetsType } from "../../utils/constant";
import type { UserInformation } from "../../models/user/userModel";
import { calculateNetWorth } from "./KycForm";

interface AssetsSectionFieldsProps {
  register: UseFormRegister<any>;
  setValue: UseFormSetValue<any>;
  errors: FieldErrors<UserInformation>;
  fields: FieldArrayWithId<UserInformation>[];
  append: any;
  remove: any;
  isEdit?: boolean;
  data?: UserInformation | null;
}

export default function AssetsSection({
  register,
  setValue,
  errors,
  fields,
  append,
  remove,
  isEdit,
  data,
}: AssetsSectionFieldsProps) {
  const [total, setTotal] = useState(0);
  const readOnly = !isEdit;
//   console.log(fields)
  useEffect(() => {
    if (data?.assets) {
      data.assets.forEach((addr, idx) => {
        setValue(`assets.${idx}.amount`, addr.amount);
        setValue(`assets.${idx}.type`, addr.type ?? AssetsType.Others);
      });
    }
  }, [data, setValue]);
  function handleSetTotal(e: any) {
    const inputs =
      document.querySelectorAll<HTMLInputElement>("input.assets");
    let total = 0;

    inputs.forEach((input) => {
      const value = parseFloat(input.value);
      if (!isNaN(value)) {
        total += value;
      }
    });
    setTotal(total);
    calculateNetWorth()
  }
  useEffect(() => {
     
    handleSetTotal(null)
  }, [fields]);
  return (
    <div className="p-4 mb-4 bg-white border border-gray-200 rounded-lg shadow-sm dark:border-gray-700 sm:p-6 dark:bg-gray-800">
      <h3 className="mb-4 text-xl font-semibold dark:text-white"> Assets (B) </h3>

      {fields.map((field, index) => (
        <div
          key={field.id}
          className="grid grid-cols-6 gap-6 border-b pb-4 mb-4"
          aria-description={field.id}
        >

          <div className="col-span-6 sm:col-span-3">
            <label
              htmlFor={`assets.${index}.type`}
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Type
            </label>
            <select
              disabled={readOnly}
              {...register(`assets.${index}.type`, { required: true })}
              className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
            >
              <option value={AssetsType.Bond}>Bond</option>
              <option value={AssetsType.Liquidity}>Liquidity</option>
              <option value={AssetsType.RealEstate}>Real Estate</option>
              <option value={AssetsType.Others}>Others</option>
            </select>
          </div>


          <div className="col-span-6 sm:col-span-3">
            <label
              htmlFor={`assets.${index}.country`}
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Amount
            </label>
            <input
              readOnly={readOnly}
              {...register(`assets.${index}.amount`, { required: true , onChange: (e)=>{handleSetTotal(e)}})}
              placeholder="Enter Amount"
              className="assets shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
            />
            {errors["assets"]?.[index]?.amount && (
              <p className="text-red-500 text-sm mt-1">
                {errors["assets"]?.[index].amount?.message ||
                  "This is required"}
              </p>
            )}
          </div>

          {isEdit && (
            <div className="col-span-6 sm:col-span-3 flex items-end">
              <button
                type="button"
                onClick={() => {remove(index); handleSetTotal(index)}}
                className="text-red-600 text-sm hover:underline"
              >
                Remove Asset
              </button>
            </div>
          )}
        </div>
      ))}
    <div className="mt-4">
        <input
          type="number"
          id="asset-total"
          className="hidden w-full px-4 py-2 mt-2 border rounded-md bg-gray-100 focus:outline-none focus:ring-2 focus:ring-secondary-color"
          placeholder="Calculated Total"
          readOnly
          value={total}
        />
      </div>
      {isEdit && (
        <button
          type="button"
          onClick={() =>
            append({
              amount: "",
              type: AssetsType.Others,
            })
          }
          className="bg-blue-600 text-white px-4 py-2 rounded text-sm"
        >
          Add Asset
        </button>
      )}
    </div>
  );
}

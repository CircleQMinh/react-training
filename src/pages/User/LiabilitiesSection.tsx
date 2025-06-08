import {
  type FieldArrayWithId,
  type FieldErrors,
  type UseFormRegister,
  type UseFormSetValue,
} from "react-hook-form";
import { useEffect, useState } from "react";
import { LiabilitiesType } from "../../utils/constant";
import type { UserInformation } from "../../models/user/userModel";
import { calculateNetWorth } from "./KycForm";

interface LiabilitiesSectionFieldsProps {
  register: UseFormRegister<any>;
  setValue: UseFormSetValue<any>;
  errors: FieldErrors<UserInformation>;
  fields: FieldArrayWithId<UserInformation, "liabilities">[];
  append: any;
  remove: any;
  isEdit?: boolean;
  data?: UserInformation | null;
}

export default function LiabilitiesSection({
  register,
  setValue,
  errors,
  fields,
  append,
  remove,
  isEdit,
  data,
}: LiabilitiesSectionFieldsProps) {
  const [totalLiabilities, settotalLiabilities] = useState(0);
  const readOnly = !isEdit;

  //   console.log(fields)
  useEffect(() => {
    if (data?.liabilities) {
      data.liabilities.forEach((addr, idx) => {
        setValue(`liabilities.${idx}.amount`, addr.amount);
        setValue(
          `liabilities.${idx}.type`,
          addr.type ?? LiabilitiesType.Others
        );
      });
    }
  }, [data, setValue]);

  function handlesettotalLiabilities(e: any) {
    const inputs =
      document.querySelectorAll<HTMLInputElement>("input.liabilities");
    let total = 0;

    inputs.forEach((input) => {
      const value = parseFloat(input.value);
      if (!isNaN(value)) {
        total += value;
      }
    });
    settotalLiabilities(total);
    calculateNetWorth()
  }
  useEffect(() => {
     
    handlesettotalLiabilities(null)
  }, [fields]);
  return (
    <div className="p-4 mb-4 bg-white border border-gray-200 rounded-lg shadow-sm dark:border-gray-700 sm:p-6 dark:bg-gray-800">
      <h3 className="mb-4 text-xl font-semibold dark:text-white">
        Liabilities (C){" "}
      </h3>
      <p className="text-sm mb-4 text-gray-600">
        Liabilities are any outstanding debts or obligations you may have. These
        can include loans such as personal loans, mortgages, or other forms of
        debt.
      </p>
      {fields.map((field, index) => (
        <div
          key={field.id}
          className="grid grid-cols-6 gap-6 border-b pb-4 mb-4"
          aria-description={field.id}
        >
          <div className="col-span-6 sm:col-span-3">
            <label
              htmlFor={`liabilities.${index}.type`}
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Type
            </label>
            <select
              disabled={readOnly}
              {...register(`liabilities.${index}.type`, { required: true })}
              className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
            >
              <option value={LiabilitiesType.PersonalLoan}>
                Personal Loan
              </option>
              <option value={LiabilitiesType.RealEstateLoan}>
                Real Estate Loan
              </option>
              <option value={LiabilitiesType.Others}>Others</option>
            </select>
          </div>

          <div className="col-span-6 sm:col-span-3">
            <label
              htmlFor={`liabilities.${index}.country`}
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Amount
            </label>
            <input
              readOnly={readOnly}
              {...register(`liabilities.${index}.amount`, {
                required: true,
                onChange: (e) => {
                  handlesettotalLiabilities(e);
                },
              })}
              placeholder="Enter Amount"
              className="liabilities shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
            />
            {errors["liabilities"]?.[index]?.amount && (
              <p className="text-red-500 text-sm mt-1">
                {errors["liabilities"]?.[index].amount?.message ||
                  "This is required"}
              </p>
            )}
          </div>

          {isEdit && (
            <div className="col-span-6 sm:col-span-3 flex items-end">
              <button
                type="button"
                onClick={() => {remove(index); handlesettotalLiabilities(index)}}
                className="text-red-600 text-sm hover:underline"
              >
                Remove Liability
              </button>
            </div>
          )}
        </div>
      ))}
      <div className="mt-4">
        <label
          htmlFor="liabilities-total"
          className="block text-sm font-medium"
        >
          Total Liabilities
        </label>
        <input
          type="number"
          id="liabilities-total"
          className="w-full px-4 py-2 mt-2 border rounded-md bg-gray-100 focus:outline-none focus:ring-2 focus:ring-secondary-color"
          placeholder="Calculated Total"
          readOnly
          value={totalLiabilities}
        />
      </div>

      {isEdit && (
        <button
          type="button"
          onClick={() =>
            append({
              amount: "",
              type: LiabilitiesType.Others,
            })
          }
          className="bg-blue-600 text-white px-4 py-2 rounded text-sm mt-2"
        >
          Add Liability
        </button>
      )}
    </div>
  );
}

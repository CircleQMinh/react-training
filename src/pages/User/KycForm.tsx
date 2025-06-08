import { useForm, type Control, useFieldArray } from "react-hook-form";

import GeneralSection from "./GeneralSection.tsx";
import { useNavigate, useParams } from "react-router-dom";
import {
  mapUserToUserInformation,
  type User,
  type UserInformation,
} from "../../models/user/userModel.ts";
import { useContext } from "react";
import { AuthenticatedContext } from "../../shared/Authenticated.tsx";
import { IsOfficer } from "../../utils/roleHelper.ts";
import { UpdateUserInfo } from "../../services/userServices.ts";
import AddressesSection from "./AddressesSection.tsx";
import EmailsSection from "./EmailsSection.tsx";
import IdDocsSection from "./IdDocsSection.tsx";
import OccupationSection from "./OccupationSection.tsx";
import IncomesSection from "./IncomesSection.tsx";
import AssestsSection from "./AssestsSection.tsx";
import LiabilitiesSection from "./LiabilitiesSection.tsx";
import SrcOfWealthSection from "./SrcOfWealthSection.tsx";
import { InvestmentExp, RiskTolerance, UserSubmissionStatus, UserSubmissionType } from "../../utils/constant.ts";
import type { UserSubmission } from "../../models/submission/submissionModel.ts";
import { addSubmission } from "../../utils/jsonHelper.ts";

type KycFormProps = {
  IsEdit: boolean;
  Data: User | null;
};

const KycForm = (props: KycFormProps) => {
  const auth = useContext(AuthenticatedContext);
  const user = auth?.user;
  const data = props.Data;
  const info = mapUserToUserInformation(data);
  const isEdit = props.IsEdit;
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const {
    register,
    watch,
    handleSubmit,
    setValue,
    control,
    formState: { errors },
  } = useForm<UserInformation>({
    defaultValues: {
      addresses: info?.addresses,
      phones: info?.phones,
      emails: info?.emails,
    },
  });

  const {
    fields: fieldsIncome,
    append: appendIncome,
    remove: removeInCome,
  } = useFieldArray({
    control,
    name: "incomes",
  });

  const {
    fields: fieldsAsset,
    append: appendAsset,
    remove: removeAsset,
  } = useFieldArray({
    control,
    name: "assets",
  });

  const {
    fields: fieldsLiab,
    append: appendLiab,
    remove: removeLiab,
  } = useFieldArray({
    control,
    name: "liabilities",
  });

  const {
    fields: fieldsSow,
    append: appendSow,
    remove: removeSow,
  } = useFieldArray({
    control,
    name: "srcOfWealths",
  });

  const isOfficer = IsOfficer(user!);

  const onSubmit = async (data: UserInformation) => {
    const getValue = (id: string): number => {
      const el = document.getElementById(id) as HTMLInputElement | null;
      return el ? parseFloat(el.value) || 0 : 0;
    };
    data.networth = getValue("net-worth-total");
    console.log("Submitted data:", data);
    const res = await UpdateUserInfo(id ?? "0", data);
    if (res.id > 0) {
      alert("Saved!");
    }

    const sub:UserSubmission = {
        id: Date.now(),
        type: UserSubmissionType.KYC,
        info: data,
        status: UserSubmissionStatus.Active,
        date: new Date,
        name: data.basic.firstName + " "+ data.basic.lastName
    }
    addSubmission(sub)

  };

  const goToKYC = () => {
    navigate(`/pages/users/${id}/kyc`);
  };
  const goToEdit = () => {
    navigate(`/pages/users/${id}/edit`);
  };

  return (
    <div className="grid grid-cols-1 px-4 pt-6 xl:gap-4 dark:bg-gray-900">
      <div className="mb-4 col-span-full xl:mb-2">
        <nav className="flex mb-5" aria-label="Breadcrumb">
          <ol className="inline-flex items-center space-x-1 text-sm font-medium md:space-x-2">
            <li className="inline-flex items-center">
              <a
                href="#"
                className="inline-flex items-center text-gray-700 hover:text-primary-600 dark:text-gray-300 dark:hover:text-white"
              >
                <svg
                  className="w-5 h-5 mr-2.5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z"></path>
                </svg>
                Home
              </a>
            </li>
            <li>
              <div className="flex items-center">
                <svg
                  className="w-6 h-6 text-gray-400"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                    clip-rule="evenodd"
                  ></path>
                </svg>
                <a
                  href="#"
                  className="ml-1 text-gray-700 hover:text-primary-600 md:ml-2 dark:text-gray-300 dark:hover:text-white"
                >
                  Users
                </a>
              </div>
            </li>
            <li>
              <div className="flex items-center">
                <svg
                  className="w-6 h-6 text-gray-400"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                    clip-rule="evenodd"
                  ></path>
                </svg>
                <span
                  className="ml-1 text-gray-400 md:ml-2 dark:text-gray-500"
                  aria-current="page"
                >
                  KYC
                </span>
              </div>
            </li>
          </ol>
        </nav>
        <h1 className="text-xl font-semibold text-gray-900 sm:text-2xl dark:text-white">
          Personal Information
        </h1>
      </div>
      <div className="p-4 mb-4 bg-white border border-gray-200 rounded-lg shadow-sm 2xl:col-span-2 dark:border-gray-700 sm:p-6 dark:bg-gray-800">
        <div className="items-center sm:flex xl:block 2xl:flex sm:space-x-4 xl:space-x-0 2xl:space-x-4">
          <img
            className="mb-4 rounded-lg w-28 h-28 sm:mb-0 xl:mb-4 2xl:mb-0"
            src="/images/users/bonnie-green-2x.png"
            alt="Jese picture"
          />
          <div>
            <h3 className="mb-1 text-xl font-bold text-gray-900 dark:text-white">
              Profile picture
            </h3>
            <div className="mb-4 text-sm text-gray-500 dark:text-gray-400">
              JPG, GIF or PNG. Max size of 800K
            </div>
            <div className="flex items-center space-x-4">
              <button
                type="button"
                className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white rounded-lg bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
              >
                <svg
                  className="w-4 h-4 mr-2 -ml-1"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M5.5 13a3.5 3.5 0 01-.369-6.98 4 4 0 117.753-1.977A4.5 4.5 0 1113.5 13H11V9.413l1.293 1.293a1 1 0 001.414-1.414l-3-3a1 1 0 00-1.414 0l-3 3a1 1 0 001.414 1.414L9 9.414V13H5.5z"></path>
                  <path d="M9 13h2v5a1 1 0 11-2 0v-5z"></path>
                </svg>
                Upload picture
              </button>
              <button
                type="button"
                className="py-2 px-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* isEdit : {isEdit ? "true" : "false"} */}
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <GeneralSection
          register={register}
          setValue={setValue}
          errors={errors}
          isEdit={isEdit}
          data={data}
        />
        <IncomesSection
          register={register}
          setValue={setValue}
          errors={errors}
          append={appendIncome}
          remove={removeInCome}
          fields={fieldsIncome}
          isEdit={isEdit}
          data={info}
        ></IncomesSection>

        <AssestsSection
          register={register}
          setValue={setValue}
          errors={errors}
          append={appendAsset}
          remove={removeAsset}
          fields={fieldsAsset}
          isEdit={isEdit}
          data={info}
        ></AssestsSection>

        <LiabilitiesSection
          register={register}
          setValue={setValue}
          errors={errors}
          append={appendLiab}
          remove={removeLiab}
          fields={fieldsLiab}
          isEdit={isEdit}
          data={info}
        ></LiabilitiesSection>

        <SrcOfWealthSection
          register={register}
          setValue={setValue}
          errors={errors}
          append={appendSow}
          remove={removeSow}
          fields={fieldsSow}
          isEdit={isEdit}
          data={info}
        ></SrcOfWealthSection>
        <div className="p-4 mb-4 bg-white border border-gray-200 rounded-lg shadow-sm dark:border-gray-700 sm:p-6 dark:bg-gray-800">
          <h3
            className="text-lg font-medium mb-4"
            style={{ color: "var(--primary-color)" }}
          >
            Net Worth
          </h3>
          <div>
            <label
              htmlFor="net-worth-total"
              className="block text-sm font-medium"
            >
              Total
            </label>
            <input
              {...register("networth", { required: false })}
              type="number"
              id="net-worth-total"
              className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-secondary-color"
              placeholder="Automatically calculated"
              disabled
            />
          </div>

          <h3
            className="text-lg font-medium mb-4"
            style={{ color: "var(--primary-color)" }}
          >
            Investment Experience and Objectives
          </h3>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="investment-experience"
                className="block text-sm font-medium"
              >
                Experience in Financial Markets
              </label>
              <select
                {...register("investExp", { required: true })}
                id="investment-experience"
                className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-secondary-color"
              >
                <option value={InvestmentExp.LessThan5Y}>&lt; 5 years</option>
                <option value={InvestmentExp.From5To10}>
                  &gt; 5 and &lt; 10 years
                </option>
                <option value={InvestmentExp.MoreThan10}>&gt; 10 years</option>
              </select>
            </div>
            <div>
              <label
                htmlFor="risk-tolerance"
                className="block text-sm font-medium"
              >
                Risk Tolerance
              </label>
              <select
                {...register("riskTor", { required: true })}
                id="risk-tolerance"
                className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-secondary-color"
              >
                <option value={RiskTolerance.Ten}>10%</option>
                <option value={RiskTolerance.Thirty}>30%</option>
                <option value={RiskTolerance.AllIn}>All-in</option>
              </select>
            </div>
          </div>
        </div>

        <div className="col-span-6 sm:col-full">
          {isOfficer ? (
            <></>
          ) : (
            <>
              {" "}
              {isEdit ? (
                <>
                  {" "}
                  <button
                    className="text-white bg-blue-400 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                    type="submit"
                  >
                    Submit
                  </button>
                </>
              ) : (
                <>
                  {" "}
                  <button
                    onClick={goToEdit}
                    className="ml-1 text-white bg-blue-400  hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                    type="button"
                  >
                    Edit
                  </button>
                </>
              )}
              <button
                onClick={goToEdit}
                className="ml-1 text-white bg-blue-400  hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                type="button"
              >
                Edit Personal Detail
              </button>
            </>
          )}
        </div>
      </form>
    </div>
  );
};

export default KycForm;

export function calculateNetWorth(): void {
  setTimeout(() => {
    const getValue = (id: string): number => {
      const el = document.getElementById(id) as HTMLInputElement | null;
      return el ? parseFloat(el.value) || 0 : 0;
    };

    const income = getValue("income-total");
    const assets = getValue("asset-total");
    const liabilities = getValue("liabilities-total");
    const sow = getValue("sow-total");

    //   console.log(income)
    //   console.log(assets)
    //   console.log(liabilities)
    //   console.log(sow)
    const netWorth = income + assets + liabilities + sow;

    const netWorthEl = document.getElementById(
      "net-worth-total"
    ) as HTMLInputElement | null;
    if (netWorthEl) {
      netWorthEl.value = netWorth.toString();
    }
  }, 1000);
}

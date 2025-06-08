import { useForm, type Control, useFieldArray } from "react-hook-form";

import GeneralSection from "./GeneralSection.tsx";
import { useNavigate, useParams } from "react-router-dom";
import {
  mapUserToUserInformation,
  type User,
  type UserInformation,
} from "../../models/user/userModel.ts";
import { useContext, useEffect } from "react";
import { AuthenticatedContext } from "../../shared/Authenticated.tsx";
import { IsOfficer } from "../../utils/roleHelper.ts";
import { UpdateUserInfo } from "../../services/userServices.ts";
import AddressesSection from "./AddressesSection.tsx";
import EmailsSection from "./EmailsSection.tsx";
import IdDocsSection from "./IdDocsSection.tsx";
import OccupationSection from "./OccupationSection.tsx";
import type { UserSubmission } from "../../models/submission/submissionModel.ts";
import {
  UserSubmissionType,
  UserSubmissionStatus,
} from "../../utils/constant.ts";
import { addSubmission } from "../../utils/jsonHelper.ts";

type ProfileFormProps = {
  IsEdit: boolean;
  Data: User | null;
};

const ProfileForm = (props: ProfileFormProps) => {
  const auth = useContext(AuthenticatedContext);
  const user = auth?.user;
  const data = props.Data;
  if(!data){
    return <></>
  }
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
    fields: fieldsAddress,
    append: appendAddress,
    remove: removeAddress,
  } = useFieldArray({
    control,
    name: "addresses",
  });
  const {
    fields: fieldsEmail,
    append: appendEmail,
    remove: removeEmail,
  } = useFieldArray({
    control,
    name: "emails",
  });
  const {
    fields: fieldsIdDoc,
    append: appendIdDoc,
    remove: removeIdDoc,
  } = useFieldArray({
    control,
    name: "iddocs",
  });
  const {
    fields: fieldsOccupation,
    append: appendOccupation,
    remove: removeOccupation,
  } = useFieldArray({
    control,
    name: "occupations",
  });
  const isOfficer = IsOfficer(user!);

  const onSubmit = async (data: any) => {
    console.log("Submitted data:", data);
    console.log(data.iddocs[0].file[0].name);
    console.log(JSON.stringify(data.iddocs));

    data.iddocs.forEach((e) => {
      e.file = e.file[0].name;
    });

    const res = await UpdateUserInfo(id ?? "0", data);
    if (res.id > 0) {
      alert("Saved!");
    }
    const sub: UserSubmission = {
      id: Date.now(),
      type: UserSubmissionType.Personal,
      info: data,
      status: UserSubmissionStatus.Active,
      date: new Date(),
      name: data.basic.firstName + " " + data.basic.lastName,
    };
    addSubmission(sub);
  };

  const goToKYC = () => {
    navigate(`/pages/users/${id}/kyc`);
  };
  const goToEdit = () => {
    navigate(`/pages/users/${id}/edit`);
  };

  useEffect(() => {}, [data]);

  return (
    <>
      {data && (
        <>
          {" "}
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
                        Personal Information
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

            <form onSubmit={handleSubmit(onSubmit)} noValidate>
              <GeneralSection
                register={register}
                setValue={setValue}
                errors={errors}
                isEdit={isEdit}
                data={data}
              />

              <AddressesSection
                register={register}
                setValue={setValue}
                errors={errors}
                append={appendAddress}
                remove={removeAddress}
                fields={fieldsAddress}
                isEdit={isEdit}
                data={info}
              ></AddressesSection>

              <EmailsSection
                register={register}
                setValue={setValue}
                errors={errors}
                append={appendEmail}
                remove={removeEmail}
                fields={fieldsEmail}
                isEdit={isEdit}
                data={info}
              ></EmailsSection>

              <IdDocsSection
                register={register}
                setValue={setValue}
                errors={errors}
                append={appendIdDoc}
                remove={removeIdDoc}
                fields={fieldsIdDoc}
                isEdit={isEdit}
                data={info}
              ></IdDocsSection>

              <OccupationSection
                register={register}
                setValue={setValue}
                watch={watch}
                errors={errors}
                append={appendOccupation}
                remove={removeOccupation}
                fields={fieldsOccupation}
                isEdit={isEdit}
                data={info}
              ></OccupationSection>

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
                      onClick={goToKYC}
                      className="ml-1 text-white bg-blue-400  hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                      type="button"
                    >
                      KYC
                    </button>
                  </>
                )}
              </div>
            </form>
          </div>
        </>
      )}
    </>
  );
};

export default ProfileForm;

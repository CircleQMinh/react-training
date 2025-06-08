import { useContext, useEffect } from "react";
import { data, useNavigate, useParams } from "react-router-dom";
import { AuthenticatedContext } from "../../shared/Authenticated";
import {
  InvestmentExp,
  RiskTolerance,
  UserSubmissionStatus,
  UserSubmissionType,
} from "../../utils/constant";
import { readSubmissions } from "../../utils/jsonHelper";
import { IsOfficer } from "../../utils/roleHelper";
import { useForm, useFieldArray } from "react-hook-form";
import type { info } from "sass";
import type { UserInformation } from "../../models/user/userModel";
import AssestsSection from "../User/AssestsSection";
import GeneralSection from "../User/GeneralSection";
import IncomesSection from "../User/IncomesSection";
import LiabilitiesSection from "../User/LiabilitiesSection";
import SrcOfWealthSection from "../User/SrcOfWealthSection";
import AddressesSection from "../User/AddressesSection";
import EmailsSection from "../User/EmailsSection";
import IdDocsSection from "../User/IdDocsSection";
import OccupationSection from "../User/OccupationSection";

export default function PreviewDetailPage() {
  const auth = useContext(AuthenticatedContext);
  const navigate = useNavigate();
  const user = auth?.user;
  const { id } = useParams<{ id: string }>();
  // const [info, setInfo] = useState<User|null>(null)
  const isEdit = false;
  let submissions = readSubmissions();
  submissions = submissions.filter((q) => q.id.toString() == id);

  useEffect(() => {
    if (!IsOfficer(user!)) {
      navigate(`/pages/home`);
    }
    if (submissions.length == 0) {
      navigate(`/pages/home`);
    }
  }, []);

  const sub = submissions[0];
  const info = sub.info;
  console.log(sub)
  const {
    register,
    watch,
    handleSubmit,
    setValue,
    control,
    formState: { errors },
  } = useForm<UserInformation>({
    defaultValues: {
      age: sub.info.age,  
      addresses: sub?.info.addresses,
      phones: sub?.info.phones,
      emails: sub?.info.emails,
      iddocs: sub?.info.iddocs,
      occupations: sub?.info.occupations,
      incomes: sub?.info.incomes,
      assets: sub?.info.assets,
      liabilities: sub?.info.liabilities,
      srcOfWealths: sub?.info.srcOfWealths,
      networth: sub?.info.networth,
      investExp: sub?.info.investExp,
      riskTor: sub?.info.riskTor,
      basic: sub?.info.basic,
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

  return (
    <>
      {sub.type == UserSubmissionType.Personal && (
        <>
          <form onSubmit={handleSubmit(() => {})} noValidate>
            <GeneralSection
              register={register}
              setValue={setValue}
              errors={errors}
              isEdit={isEdit}
              data={sub}
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
          </form>
        </>
      )}
      {sub.type == UserSubmissionType.KYC && (
        <>
          <form onSubmit={handleSubmit(() => {})} noValidate>
            <GeneralSection
              register={register}
              setValue={setValue}
              errors={errors}
              isEdit={isEdit}
              data={sub}
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
                                disabled={true}
                    {...register("investExp", { required: true })}
                    id="investment-experience"
                    className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-secondary-color"
                  >
                    <option value={InvestmentExp.LessThan5Y}>
                      &lt; 5 years
                    </option>
                    <option value={InvestmentExp.From5To10}>
                      &gt; 5 and &lt; 10 years
                    </option>
                    <option value={InvestmentExp.MoreThan10}>
                      &gt; 10 years
                    </option>
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
                  disabled={true}
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
          </form>
        </>
      )}
    </>
  );
}

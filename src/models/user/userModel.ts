import { AddressTypeEnum, AssetsType, EmailTypeEnum, IncomeType, InvestmentExp, LiabilitiesType, OccupationType, PhoneTypeEnum, RiskTolerance, SrcOfWealthType, type IDDocType } from "../../utils/constant";

export type UserLoginModel = {
  username: string;
  password: string;
};

export interface User {
  id: number;

  firstName?: string;
  lastName?: string;
  maidenName?: string;
  age?: number;
  gender?: string;
  email?: string;
  phone?: string;
  username?: string;
  password?: string;
  birthDate?: string;
  image?: string;
  bloodGroup?: string;
  height?: number;
  weight?: number;
  eyeColor?: string;

  hair?: {
    color?: string;
    type?: string;
  };

  ip?: string;

  address?: {
    address?: string;
    city?: string;
    state?: string;
    stateCode?: string;
    postalCode?: string;
    coordinates?: {
      lat?: number;
      lng?: number;
    };
    country?: string;
  };

  macAddress?: string;
  university?: string;

  bank?: {
    cardExpire?: string;
    cardNumber?: string;
    cardType?: string;
    currency?: string;
    iban?: string;
  };

  company?: {
    department?: string;
    name?: string;
    title?: string;
    address?: {
      address?: string;
      city?: string;
      state?: string;
      stateCode?: string;
      postalCode?: string;
      coordinates?: {
        lat?: number;
        lng?: number;
      };
      country?: string;
    };
  };

  ein?: string;
  ssn?: string;
  userAgent?: string;

  crypto?: {
    coin?: string;
    wallet?: string;
    network?: string;
  };

  role?: string;
}

export interface UserInformation{
  id: number;
  age:number;
  basic: BasicInformation
  addresses: Address[]
  emails: Email[]
  phones: Phone[]
  iddocs: IDDoc[]
  occupations: Occupation[]
  incomes: Incomes[]
  assets: Assets[]
  liabilities: Liabilities[]
  srcOfWealths: SrcOfWealth[]
  networth: number,
  investExp: InvestmentExp,
  riskTor: RiskTolerance
}
export interface BasicInformation{
  firstName?: string;
  lastName?: string;
  middleName?: string;
  dob?: string
}

export interface Address{
  country?: string
  city?: string
  street?: string
  postalcode?: string
  type? : AddressTypeEnum
}
export interface Email{
  email?:string
  type?: EmailTypeEnum
  preferred?: boolean
}
export interface Phone{
  number?: string
  type?: PhoneTypeEnum
  perferred?: boolean
}
export interface IDDoc{
  type?:IDDocType,
  expiryDate?: string,
  file?:string[]
}
export interface Occupation{
  type?:OccupationType,
  from?: string
  to?: string
}

export interface Incomes{
  type?: IncomeType,
  amount:number
}

export interface Assets{
  type?: AssetsType,
  amount:number
}

export interface Liabilities{
  type?: LiabilitiesType,
  amount: number
}

export interface SrcOfWealth{
  type?: SrcOfWealthType,
  amount: number
}


export function mapUserToUserInformation(user: User|null): UserInformation|null {
  if(user == null){
    return null;
  }
  const basic: BasicInformation = {
    firstName: user.firstName ?? undefined,
    lastName: user.lastName ?? undefined,
    middleName: user.maidenName ?? undefined,
    dob: user.birthDate ?? undefined,
  };

  const addresses: Address[] = [];

  if (user.address) {
    addresses.push({
      country: user.address.country ?? undefined,
      city: user.address.city ?? undefined,
      street: user.address.address ?? undefined,
      postalcode: user.address.postalCode ?? undefined,
      type: AddressTypeEnum.Mailing, // Default if not known
    });
  }

  if (user.company?.address) {
    addresses.push({
      country: user.company.address.country ?? undefined,
      city: user.company.address.city ?? undefined,
      street: user.company.address.address ?? undefined,
      postalcode: user.company.address.postalCode ?? undefined,
      type: AddressTypeEnum.Work,
    });
  }


  const emails: Email[] = [];

  if(user.email){
    emails.push({
      email: user.email,
      type:EmailTypeEnum.Personal,
      preferred:true
    })
  }

  const phones: Phone[] = user.phone
    ? [{ number: user.phone, type: PhoneTypeEnum.Personal, perferred: true }]
    : [];

  const iddocs: IDDoc[] = []; // No matching fields in User
  const occupations: Occupation[] = [];

  return {
    id: user.id,
    basic,
    addresses,
    emails,
    phones,
    iddocs,
    occupations,
    incomes : [],
    assets:[],
    liabilities: [],
    srcOfWealths: [],
    networth: 0,
    investExp: InvestmentExp.LessThan5Y,
    riskTor: RiskTolerance.Ten,
    age: 0
  };
}

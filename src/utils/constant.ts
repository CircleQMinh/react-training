export enum AddressTypeEnum{
    Mailing = 0,
    Work = 1
}
export enum EmailTypeEnum{
    Personal = 0,
    Work = 1
}
export enum PhoneTypeEnum{
    Personal = 0,
    Work = 1
}
export enum IDDocType{
    Passport = 0,
    IDCard = 1,
    DriverLicense = 2
}
export enum OccupationType{
    Unemployed = 0,
    Developer = 1,
    Tester = 2,
    BA = 3,
    
}

export enum IncomeType{
    Salary = 0,
    Investment = 1,
    Others = 2
}

export enum AssetsType{
    Bond = 0,
    Liquidity = 1,
    RealEstate = 2,
    Others = 3
}

export enum LiabilitiesType{
    PersonalLoan = 0,
    RealEstateLoan = 1,
    Others = 2
}

export enum SrcOfWealthType{
    Inheritance = 0,
    Donation = 1
}

export enum InvestmentExp{
    LessThan5Y = 0,
    From5To10 = 1,
    MoreThan10 = 2
}

export enum RiskTolerance{
    Ten = 0,
    Thirty = 1,
    AllIn = 2
}

export enum UserSubmissionType{
    Personal = 1,
    KYC = 2
}
export enum UserSubmissionStatus{
    Active = 0,
    Rejected = 1,
    Approved = 2
}
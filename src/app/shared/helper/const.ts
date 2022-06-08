export const COPY: any = {
    APP_NAME: 'Prosppr',

    SUCCESS: "SUCCESS",
    BANK_DETAILS_LABEL: "Bank Details",
    BANK_VERIFICATION_LABEL: "Bank Verification",
    PLEASE_WAIT_LABEL: "Please wait",
    KYC_DOCUMENT_LABEL: "KYC Document",
    DOCUMENT_VERIFY_LABEL: "Document Verify",
    SELECT_DOCUMENT_LABEL: "Select Document",
    ENTER_NUMBER_LABEL: "Enter Number",
    TAKE_PHOTO_LABEL: "Take a photo",

    FRONT_SIDE_LABEL: "Scan the front",
    BACK_SIDE_LABEL: "Scan the back",
    takePhotoLable: (side: 'front' | 'back', documentLabel: string) => `Take/pick a photo of the ${side} of your ${documentLabel}`,
    takeYourPhoto: "Take your photo",

    ADDRESS_PROOF: 'Address proof',
    IDENTITY_PROOF: 'Identity proof',
    AADHAAR_CARD: "Aadhaar card",
    DRIVING_LICENSE: "Driving licence",
    PAN_CARD: 'PAN card',

    VERIFY_LABEL: "Verify",
    CANCEL_LABEL: "Cancel",
    STATUS_PENDING: "Pending",
    STATUS_VERIFIED: "Verified",
    SELFIE: "Selfie",
    VERIFY_PAN_CARD_LABEL: "Verify PAN Card",
    VERIFY_ID_LABEL: "Verify Aadhaar Card",
    OPTIONAL: 'optional'
};

export const BANK_ACCOUNT_TYPE = [
    { label: "Current account", value: "current" },
    { label: "Savings account", value: "savings" },
    { label: "Salary account", value: "salary" },
    { label: "Fixed deposit account", value: "fixed_deposit" },
    { label: "Recurring deposit account", value: "recurring_deposit" },
    { label: "NRI accounts", value: "NRI" },
];

export enum DocumentTypeEnum {
    AADHAR_CARD = 'adhaarCard',
    DRIVING_LICENSE = 'drivingLicense',
    PAN = 'panCard',
}

export const DOCUMENT_LIST = [
    {
        label: COPY.AADHAAR_CARD,
        value: DocumentTypeEnum.AADHAR_CARD
    },
    {
        label: COPY.DRIVING_LICENSE,
        value: DocumentTypeEnum.DRIVING_LICENSE
    },
    {
        label: COPY.PAN_CARD,
        value: DocumentTypeEnum.PAN
    },
];

export enum VerifyTypeEnum {
    SELFIE = 'selfie',
    ID_VERIFY = 'id-verify',
    PAN = 'PAN',
}

export const COLORS = [
    '#003f5c',
    '#444e86',
    '#955196',
    '#dd5182',
    '#ff6e54',
    '#ffa600'
];

export const COINS = {
    BTC: {
        fullName: "Bitcoin",
        icon: "assets/icon-bitc.svg",
    },
    ETH: {
        fullName: "Ethereum",
        icon: "assets/icon-et.svg",
    },
    VI: {
        fullName: "Viacoin",
        icon: "assets/icon-vi.svg",
    }
}
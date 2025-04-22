import {
  Click,
  Transaction,
  ShortLink,
  User,
  $Enums,
  File,
} from "@prisma/client";

export type WithdrawMethods = "USDT" | "PAYPAL" | "PAYEER" | "PERFECTMONEY";

interface IErrors {
  [k: string]: string[];
}

interface createLinkPublicSuccessState {
  status: "SUCCESS";
  data: ShortLink;
}
interface createLinkPublicPendingState {
  status: "PENDING";
}
interface createLinkPublicFailedState {
  status: "FAILED";
  errors: IErrors;
}

export type createLinkPublicState =
  | createLinkPublicSuccessState
  | createLinkPublicPendingState
  | createLinkPublicFailedState;

interface ResponseError<Errors> {
  success: false;
  errors: Errors;
}

interface ResponseSuccess<Data> {
  success: true;
  data: Data;
}

export type IClickResponse = ResponseError<IErrors> | ResponseSuccess<Click>;

export type IgetUrlsResponse =
  | ResponseError<IErrors>
  | ResponseSuccess<ShortLink[]>;

export type ICheckClickResponse =
  | ResponseError<IErrors>
  | ResponseSuccess<string | File[]>;

interface IAuthFormStateSuccess {
  isSuccess: true;
  isError: false;
}
interface IAuthFormStatePending {
  isSuccess: false;
  isError: false;
}
interface IAuthFormStateError {
  isSuccess: false;
  isError: true;
  errors: IErrors;
}
export type IAuthFormState =
  | IAuthFormStateSuccess
  | IAuthFormStatePending
  | IAuthFormStateError;

export type IcreateUserApiResponse =
  | ResponseSuccess<Pick<User, "username" | "id">>
  | ResponseError<IErrors>;

export interface ITransactionsChartResultData {
  day: string;
  downloads: number;
  redirects: number;
}

export type ITransactionsChartResponse =
  | ResponseSuccess<ITransactionsChartResultData[]>
  | ResponseError<IErrors>;

export type IUserBalanceResponse =
  | ResponseSuccess<{
      balance: number;
      dailyChange: number;
    }>
  | ResponseError<IErrors>;
export type IUserDailyDownloadsResponse =
  | ResponseSuccess<{
      downloads: number;
      dailyChange: number;
    }>
  | ResponseError<IErrors>;
export type IUserDailyRedirectsResponse =
  | ResponseSuccess<{
      redirects: number;
      dailyChange: number;
    }>
  | ResponseError<IErrors>;

export type IUserCreateLinkState = createLinkPublicState;

interface LinkData {
  type: $Enums.UrlType;
  ads: boolean;
  shortSlug: string;
  createdAt: string;
  _count: {
    clicks: number;
  };
}

interface IGetLinksData {
  redirects: number;
  uploads: number;
  dailyRedirects: number;
  dailyUploads: number;
  links: LinkData[];
}

export type IGetLinksResponse =
  | ResponseSuccess<IGetLinksData>
  | ResponseError<IErrors>;

export type ISettingsFormState = IAuthFormState;
export type IWithdrawFormState = IAuthFormState;
export type IUpdateSettingsResponse =
  | ResponseSuccess<null>
  | ResponseError<IErrors>;

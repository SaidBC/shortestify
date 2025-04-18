import { Click, Url, User } from "@prisma/client";

export type WithdrawMethods = "USDT" | "PAYPAL" | "PAYEER" | "PERFECTMONEY";

interface IErrors {
  [k: string]: string[];
}

export interface createLinkPublicState {
  status: "PENDING" | "SUCCESS" | "FAILED";
  data?: Url;
  errors?: IErrors;
}

interface ResponseError<Errors> {
  success: false;
  errors: Errors;
}

interface ResponseSuccess<Data> {
  success: true;
  data: Data;
}

export type IClickResponse = ResponseError<IErrors> | ResponseSuccess<Click>;

export type IgetUrlsResponse = ResponseError<IErrors> | ResponseSuccess<Url[]>;

export type ICheckClickResponse =
  | ResponseError<IErrors>
  | ResponseSuccess<
      Click & {
        url: Url;
      }
    >;

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

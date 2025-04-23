"use server";
import {
  createLinkPublicState,
  IAuthFormState,
  IcreateUserApiResponse,
  ISettingsFormState,
  IUpdateSettingsResponse,
  IUserCreateLinkState,
  IWithdrawFormState,
} from "@/types";
import clientEnv from "../utils/clientEnv";
import createLinkSchema from "./schemas/createLinkSchema";
import axios from "axios";
import loginSchema from "./schemas/loginSchema";
import prisma from "./prisma";
import bcrypt from "bcryptjs";
import { signIn, signOut } from "@/auth";
import signUpSchema from "./schemas/signUpSchema";
import { revalidatePath } from "next/cache";
import { getToken } from "next-auth/jwt";
import { headers } from "next/headers";
import updateUsernameSchema from "./schemas/updateUsernameSchema";
import updateEmailSchema from "./schemas/updateEmailSchema";
import updatePasswordSchema from "./schemas/updatePasswordSchema";
import withdrawSchema from "./schemas/withdrawSchema";

axios.defaults.baseURL = clientEnv.NEXT_PUBLIC_API_URL;

export async function createLinkPublicAction(
  prevState: any,
  formData: FormData
): Promise<createLinkPublicState> {
  const validateData = createLinkSchema.safeParse(Object.fromEntries(formData));
  if (!validateData.success) {
    return {
      status: "FAILED",
      errors: validateData.error.flatten().fieldErrors,
    };
  }
  try {
    const res = await axios.post("/urls", validateData.data);
    if (res.data.success) {
      return {
        status: "SUCCESS",
        data: res.data.data,
      };
    } else {
      return {
        status: "FAILED",
        errors: res.data.errors,
      };
    }
  } catch (error) {
    return {
      status: "FAILED",
      errors: {
        request: ["Something went wrong try again ."],
      },
    };
  }
}

export async function signInWithCredentials(
  prevState: any,
  formData: FormData
): Promise<IAuthFormState> {
  const validatedData = loginSchema.safeParse(Object.fromEntries(formData));
  if (!validatedData.success)
    return {
      isSuccess: false,
      isError: true,
      errors: validatedData.error.flatten().fieldErrors,
    };
  const user = await prisma.user.findFirst({
    where: {
      username: validatedData.data.username,
    },
  });
  if (!user)
    return {
      isSuccess: false,
      isError: true,
      errors: {
        credentials: ["Invalid credentials"],
      },
    };
  const isMatch = await bcrypt.compare(
    validatedData.data.password,
    user.password
  );
  if (!isMatch)
    return {
      isSuccess: false,
      isError: true,
      errors: {
        credentials: ["Invalid credentials"],
      },
    };
  await signIn("credentials", {
    ...Object.fromEntries(formData),
    redirect: false,
  });
  return {
    isSuccess: true,
    isError: false,
  };
}

export async function signUpWithCredentials(
  prevState: any,
  formData: FormData
): Promise<IAuthFormState> {
  const validatedData = signUpSchema.safeParse(Object.fromEntries(formData));
  if (!validatedData.success)
    return {
      isSuccess: false,
      isError: true,
      errors: validatedData.error.flatten().fieldErrors,
    };
  const { confirmPassword, ...data } = validatedData.data;
  try {
    const res = await axios.post<IcreateUserApiResponse>("/users", data);
    if (!res.data.success)
      return {
        isSuccess: false,
        isError: true,
        errors: res.data.errors,
      };
    await signIn("credentials", {
      username: formData.get("username"),
      password: formData.get("password"),
      redirect: false,
    });
    return {
      isSuccess: true,
      isError: false,
    };
  } catch (error) {
    console.error(error);
    return {
      isSuccess: false,
      isError: true,
      errors: {
        request: ["Something went wrong try again ."],
      },
    };
  }
}

export async function logout() {
  await signOut();
  revalidatePath("/me/dashboard");
}

export async function userCreateLink(
  prevState: any,
  formData: FormData
): Promise<IUserCreateLinkState> {
  const validateData = createLinkSchema.safeParse(Object.fromEntries(formData));
  if (!validateData.success) {
    return {
      status: "FAILED",
      errors: validateData.error.flatten().fieldErrors,
    };
  }
  try {
    const token = await getToken({
      secureCookie: clientEnv.NEXT_PUBLIC_NODE_ENV === "production",
      raw: true,
      req: {
        headers: await headers(),
      },
    });
    const res = await axios.post("/urls", validateData.data, {
      headers: {
        Authorization: "Bearer " + token,
      },
    });
    if (res.data.success) {
      return {
        status: "SUCCESS",
        data: res.data.data,
      };
    } else {
      return {
        status: "FAILED",
        errors: res.data.errors,
      };
    }
  } catch (error) {
    return {
      status: "FAILED",
      errors: {
        request: ["Something went wrong try again ."],
      },
    };
  }
}

type SettingsType = "email" | "password" | "username";
async function updateSettings(
  data: any,
  settingsType: SettingsType
): Promise<ISettingsFormState> {
  try {
    const token = await getToken({
      secureCookie: clientEnv.NEXT_PUBLIC_NODE_ENV === "production",
      raw: true,
      req: {
        headers: await headers(),
      },
    });
    const res = await axios.post<IUpdateSettingsResponse>(
      "/me/settings/" + settingsType,
      data,
      {
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    );
    if (!res.data.success)
      return {
        isSuccess: false,
        isError: true,
        errors: res.data.errors,
      };
    return {
      isSuccess: true,
      isError: false,
    };
  } catch (error) {
    return {
      isError: true,
      isSuccess: false,
      errors: {
        request: ["Something went wrong try again ."],
      },
    };
  }
}

export async function updateUsername(
  prevState: any,
  formData: FormData
): Promise<ISettingsFormState> {
  const validateData = updateUsernameSchema.safeParse(
    Object.fromEntries(formData)
  );
  if (!validateData.success) {
    return {
      isError: true,
      isSuccess: false,
      errors: validateData.error.flatten().fieldErrors,
    };
  }
  return updateSettings(validateData.data, "username");
}

export async function updateEmail(
  prevState: any,
  formData: FormData
): Promise<ISettingsFormState> {
  const validateData = updateEmailSchema.safeParse(
    Object.fromEntries(formData)
  );
  if (!validateData.success) {
    return {
      isError: true,
      isSuccess: false,
      errors: validateData.error.flatten().fieldErrors,
    };
  }
  return updateSettings(validateData.data, "email");
}
export async function updatePassword(
  prevState: any,
  formData: FormData
): Promise<ISettingsFormState> {
  const validateData = updatePasswordSchema.safeParse(
    Object.fromEntries(formData)
  );
  if (!validateData.success) {
    return {
      isError: true,
      isSuccess: false,
      errors: validateData.error.flatten().fieldErrors,
    };
  }
  return updateSettings(validateData.data, "password");
}

export async function withdraw(
  prevState: any,
  formData: FormData
): Promise<IWithdrawFormState> {
  const validateData = withdrawSchema.safeParse(Object.fromEntries(formData));
  if (!validateData.success) {
    return {
      isError: true,
      isSuccess: false,
      errors: validateData.error.flatten().fieldErrors,
    };
  }
  try {
    const token = await getToken({
      secureCookie: clientEnv.NEXT_PUBLIC_NODE_ENV === "production",
      raw: true,
      req: {
        headers: await headers(),
      },
    });
    const res = await axios.post<IUpdateSettingsResponse>(
      "/me/withdraw",
      validateData.data,
      {
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    );
    if (!res.data.success)
      return {
        isSuccess: false,
        isError: true,
        errors: res.data.errors,
      };
    return {
      isSuccess: true,
      isError: false,
    };
  } catch (error) {
    return {
      isError: true,
      isSuccess: false,
      errors: {
        request: ["Something went wrong try again ."],
      },
    };
  }
}

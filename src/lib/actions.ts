"use server";
import {
  createLinkPublicState,
  IAuthFormState,
  IcreateUserApiResponse,
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
    const res = await axios.post(
      clientEnv.NEXT_PUBLIC_API_URL + "/urls",
      validateData.data
    );
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
  console.log(formData);

  const validatedData = signUpSchema.safeParse(Object.fromEntries(formData));
  if (!validatedData.success)
    return {
      isSuccess: false,
      isError: true,
      errors: validatedData.error.flatten().fieldErrors,
    };
  const { confirmPassword, ...data } = validatedData.data;
  try {
    const res = await axios.post<IcreateUserApiResponse>(
      clientEnv.NEXT_PUBLIC_API_URL + "/users",
      data
    );
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

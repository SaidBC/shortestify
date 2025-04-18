import type { Session, User } from "next-auth";
import type { JWT } from "next-auth/jwt";

declare module "next-auth" {
  interface User {
    username: string;
    id: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    username: string;
    id: string;
  }
}

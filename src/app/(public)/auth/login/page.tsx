import LoginCard from "@/ui/auth/login/LoginCard";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Login",
};
export default function Page() {
  return (
    <main className="min-h-dvh pt-36 px-2 sm-4">
      <LoginCard />
    </main>
  );
}

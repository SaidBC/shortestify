import SignupCard from "@/ui/auth/signup/SignupCard";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "SignUp",
};
export default function Page() {
  return (
    <main className="min-h-dvh py-24 pt-36 px-2 sm-4">
      <SignupCard />
    </main>
  );
}

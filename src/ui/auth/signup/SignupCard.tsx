import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import SignupForm from "./SignupForm";
import Link from "next/link";

export default function LoginCard() {
  return (
    <Card className="max-w-lg mx-auto">
      <CardHeader>
        <CardTitle className="text-center text-3xl">Signup</CardTitle>
      </CardHeader>
      <CardContent>
        <SignupForm />
      </CardContent>
      <CardFooter>
        <p>
          Already have an account?&nbsp;
          <Link
            className="text-blue-600 hover:text-blue-500"
            href="/auth/login"
          >
            Login
          </Link>
        </p>
      </CardFooter>
    </Card>
  );
}

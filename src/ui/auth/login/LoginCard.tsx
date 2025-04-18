import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import LoginForm from "./LoginForm";
import Link from "next/link";

export default function LoginCard() {
  return (
    <Card className="max-w-lg mx-auto">
      <CardHeader>
        <CardTitle className="text-center text-3xl">Login</CardTitle>
      </CardHeader>
      <CardContent>
        <LoginForm />
      </CardContent>
      <CardFooter>
        <p>
          Don't have and account yet?&nbsp;
          <Link
            className="text-blue-600 hover:text-blue-500"
            href="/auth/signup"
          >
            Signup
          </Link>
        </p>
      </CardFooter>
    </Card>
  );
}

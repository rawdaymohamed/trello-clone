import { SignupForm } from "@/components/auth/SignupForm";
import { Columns3 } from "lucide-react";
import { Link } from "react-router-dom";

export default function SignupPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50 p-4">
      <div className="w-full max-w-md space-y-8 rounded-xl border bg-white p-8 shadow-sm">
        {/* Logo & Header */}
        <div className="flex flex-col items-center space-y-2 text-center">
          <div className="rounded-full bg-blue-600 p-3 text-white">
            <Columns3 size={28} />
          </div>
          <h1 className="text-2xl font-bold tracking-tight">
            Create an account
          </h1>
          <p className="text-sm text-muted-foreground">
            Already have an account?{" "}
            <Link
              to="/login"
              className="font-medium text-blue-600 hover:underline"
            >
              Log in
            </Link>
          </p>
        </div>

        {/* The Form Component */}
        <SignupForm />

        {/* Footer Note */}
        <p className="px-8 text-center text-xs text-muted-foreground">
          By clicking continue, you agree to our{" "}
          <span className="underline underline-offset-4 hover:text-primary cursor-pointer">
            Terms of Service
          </span>{" "}
          and{" "}
          <span className="underline underline-offset-4 hover:text-primary cursor-pointer">
            Privacy Policy
          </span>
          .
        </p>
      </div>
    </div>
  );
}

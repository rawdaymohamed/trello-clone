import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signupSchema, type SignupInput } from "@/lib/validations/auth";
import { useRegisterMutation } from "@/store/api/authApi";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
export function SignupForm() {
  const [register, { isLoading }] = useRegisterMutation();

  const form = useForm<SignupInput>({
    resolver: zodResolver(signupSchema),
    defaultValues: { name: "", username: "", email: "", password: "" },
  });

  const onSubmit = async (data: SignupInput) => {
    try {
      await register(data).unwrap();
      toast.success("Account created successfully.");
    } catch (err) {
      const error = err as { data?: { message?: string } };
      toast.error(error.data?.message || "Something went wrong");
    }
  };

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
      <Input {...form.register("name")} placeholder="Name" />
      {form.formState.errors.name && (
        <p className="text-red-500 text-sm">
          {form.formState.errors.name.message}
        </p>
      )}

      <Input {...form.register("username")} placeholder="Username" />
      {form.formState.errors.username && (
        <p className="text-red-500 text-sm">
          {form.formState.errors.username.message}
        </p>
      )}

      <Input {...form.register("email")} placeholder="Email" />
      {form.formState.errors.email && (
        <p className="text-red-500 text-sm">
          {form.formState.errors.email.message}
        </p>
      )}

      <Input
        {...form.register("password")}
        type="password"
        placeholder="Password"
      />
      {form.formState.errors.password && (
        <p className="text-red-500 text-sm">
          {form.formState.errors.password.message}
        </p>
      )}

      <Button type="submit" disabled={isLoading} className="w-full">
        {isLoading ? "Creating Account..." : "Sign Up"}
      </Button>
    </form>
  );
}

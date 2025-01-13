"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { createClient } from "@/lib/supabase/client";
import { Icon } from "@/components/ui/icon";
import { PasswordInput } from "@/components/ui/password-input";

export default function SignUpPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsLoading(true);
    setError(null);

    const formData = new FormData(event.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const name = formData.get("name") as string;
    const lastName = formData.get("lastName") as string;

    try {
      const supabase = createClient();
      
      const { error: signUpError, data } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            name,
            last_name: lastName,
          },
        },
      });

      if (signUpError) throw signUpError;

      // Create profile
      const { error: profileError } = await supabase
        .from("profiles")
        .insert([{ id: data.user?.id, email, name, last_name: lastName }]);

      if (profileError) throw profileError;

      router.push("/auth/login?message=Check your email to confirm your account");
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred during sign up");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <>
      <div className="text-center">
        <h2 className="mt-6 text-3xl font-bold text-card-foreground">
          Create your account
        </h2>
        <p className="mt-2 text-sm text-muted-foreground">
          Sign up to start tracking your job applications
        </p>
      </div>

      {error && (
        <div className="bg-destructive/10 text-destructive p-3 rounded-md text-sm">
          {error}
        </div>
      )}

      <form className="mt-8 space-y-6" onSubmit={onSubmit}>
        <div className="space-y-4">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-card-foreground"
            >
              Email address
            </label>
            <div className="relative mt-1">
              <div className="absolute inset-y-0 left-0 pl-3 inline-flex items-center pointer-events-none">
                <Icon name="Envelope" className="text-muted-foreground" />
              </div>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="block w-full rounded-md border border-input bg-background py-2 pl-10 pr-3 shadow-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
              />
            </div>
          </div>

          <div>
            <PasswordInput
              id="password"
              name="password"
              label="Password"
              autoComplete="new-password"
              required
            />
          </div>

          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-card-foreground"
            >
              Name
            </label>
            <div className="relative mt-1">
              <div className="absolute inset-y-0 left-0 pl-3 inline-flex items-center pointer-events-none">
                <Icon name="User" className="text-muted-foreground" />
              </div>
              <input
                id="name"
                name="name"
                type="text"
                autoComplete="given-name"
                required
                className="block w-full rounded-md border border-input bg-background py-2 pl-10 pr-3 shadow-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="lastName"
              className="block text-sm font-medium text-card-foreground"
            >
              Last Name
            </label>
            <div className="relative mt-1">
              <div className="absolute inset-y-0 left-0 pl-3 inline-flex items-center pointer-events-none">
                <Icon name="User" className="text-muted-foreground" />
              </div>
              <input
                id="lastName"
                name="lastName"
                type="text"
                autoComplete="family-name"
                required
                className="block w-full rounded-md border border-input bg-background py-2 pl-10 pr-3 shadow-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
              />
            </div>
          </div>
        </div>

        <div>
          <button
            type="submit"
            disabled={isLoading}
            className={cn(
              "w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-primary-foreground bg-primary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary",
              isLoading && "opacity-50 cursor-not-allowed"
            )}
          >
            {isLoading ? (
              <div className="flex items-center justify-center">
                <Icon name="CircleNotch" className="animate-spin mr-2" />
                Creating account...
              </div>
            ) : (
              "Create account"
            )}
          </button>
        </div>

        <div className="text-center text-sm">
          <span className="text-muted-foreground">Already have an account?</span>{" "}
          <Link
            href="/auth/login"
            className="font-medium text-primary hover:text-primary/90"
          >
            Sign in
          </Link>
        </div>
      </form>
    </>
  );
}

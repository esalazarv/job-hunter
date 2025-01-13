"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";
import { Icon } from "@/components/ui/icon";
import { PasswordInput } from "@/components/ui/password-input";
import { cn } from "@/lib/utils";

export default function ResetPasswordPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  // Check if we have a token in the URL (for password reset)
  const hasToken = searchParams.has("token");

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsLoading(true);
    setError(null);
    setSuccess(null);

    const formData = new FormData(event.currentTarget);
    const supabase = createClient();

    try {
      if (hasToken) {
        // Reset password with token
        const newPassword = formData.get("password") as string;
        const { error: resetError } = await supabase.auth.updateUser({
          password: newPassword,
        });

        if (resetError) throw resetError;

        setSuccess("Password successfully reset. You can now login with your new password.");
        setTimeout(() => {
          router.push("/auth/login?message=Password+reset+successful");
        }, 2000);
      } else {
        // Request password reset
        const email = formData.get("email") as string;
        const { error: resetError } = await supabase.auth.resetPasswordForEmail(
          email,
          {
            redirectTo: `${window.location.origin}/auth/reset-password`,
          }
        );

        if (resetError) throw resetError;

        setSuccess(
          "If an account exists with this email, you will receive password reset instructions shortly."
        );
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="w-full max-w-md space-y-8 p-8 bg-card rounded-xl shadow-2xl">
        <div className="text-center">
          <h2 className="mt-6 text-3xl font-bold text-card-foreground">
            {hasToken ? "Reset Your Password" : "Forgot Password"}
          </h2>
          <p className="mt-2 text-sm text-muted-foreground">
            {hasToken
              ? "Enter your new password below"
              : "Enter your email address and we'll send you a link to reset your password"}
          </p>
        </div>

        {error && (
          <div className="bg-destructive/10 text-destructive p-3 rounded-md text-sm">
            {error}
          </div>
        )}

        {success && (
          <div className="bg-primary/10 text-primary p-3 rounded-md text-sm">
            {success}
          </div>
        )}

        <form className="mt-8 space-y-6" onSubmit={onSubmit}>
          <div className="space-y-4">
            {hasToken ? (
              <PasswordInput
                id="password"
                name="password"
                label="New Password"
                autoComplete="new-password"
                required
              />
            ) : (
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
            )}
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
                  {hasToken ? "Resetting Password..." : "Sending Reset Link..."}
                </div>
              ) : hasToken ? (
                "Reset Password"
              ) : (
                "Send Reset Link"
              )}
            </button>
          </div>

          <div className="text-center text-sm">
            <Link
              href="/auth/login"
              className="font-medium text-primary hover:text-primary/90"
            >
              Back to login
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

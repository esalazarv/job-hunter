import { useState, forwardRef } from "react";
import { Icon } from "@/components/ui/icon";
import { cn } from "@/lib/utils";

export interface PasswordInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

const PasswordInput = forwardRef<HTMLInputElement, PasswordInputProps>(
  ({ className, label, error, ...props }, ref) => {
    const [showPassword, setShowPassword] = useState(false);

    const togglePassword = () => {
      setShowPassword(!showPassword);
    };

    return (
      <div className="w-full">
        {label && (
          <label
            htmlFor={props.id}
            className="block text-sm font-medium text-card-foreground"
          >
            {label}
          </label>
        )}
        <div className="relative mt-1">
          <div className="absolute inset-y-0 left-0 pl-3 inline-flex items-center pointer-events-none">
            <Icon name="Lock" className="text-muted-foreground" />
          </div>
          <input
            type={showPassword ? "text" : "password"}
            className={cn(
              "block w-full rounded-md border border-input bg-background py-2 pl-10 pr-10 shadow-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary",
              error &&
                "border-destructive focus:ring-destructive focus:border-destructive",
              className
            )}
            ref={ref}
            {...props}
          />
          <button
            type="button"
            onClick={togglePassword}
            className="absolute inset-y-0 right-0 pr-3 flex items-center"
            tabIndex={-1}
          >
            <Icon
              name={showPassword ? "Eye" : "EyeSlash"}
              className="text-muted-foreground hover:text-primary transition-colors"
              size={16}
            />
          </button>
        </div>
        {error && <p className="mt-1 text-sm text-destructive">{error}</p>}
      </div>
    );
  }
);

PasswordInput.displayName = "PasswordInput";

export { PasswordInput };

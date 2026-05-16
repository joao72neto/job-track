import { ComponentPropsWithRef, ElementType, forwardRef } from "react";
import { clsx } from "clsx";

const baseClasses = clsx(
  "mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm",
  "focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500",
  "dark:border-gray-600 dark:bg-gray-700 dark:text-white transition-colors",
);

const errorClasses =
  "border-red-500 focus:border-red-500 focus:ring-0! dark:border-red-500 animate-shake";

interface InputProps extends ComponentPropsWithRef<"input"> {
  label?: string;
  as?: "input" | "textarea" | "select";
  error?: string;
}

const Input = forwardRef<
  HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement,
  InputProps
>(({ label, as = "input", id, className, error, ...rest }, ref) => {
  const Component = as as ElementType;

  return (
    <div className="w-full">
      {label && (
        <label
          htmlFor={id}
          className="block text-sm font-medium text-gray-700 dark:text-gray-300"
        >
          {label}
        </label>
      )}
      <Component
        ref={ref}
        id={id}
        className={clsx(baseClasses, error && errorClasses, className)}
        {...rest}
      />
      {error && (
        <span className="mt-1 text-xs text-red-500 dark:text-red-400">
          {error}
        </span>
      )}
    </div>
  );
});

Input.displayName = "Input";

export default Input;

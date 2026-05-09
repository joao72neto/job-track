import { ComponentPropsWithRef, ElementType } from "react";
import { clsx } from "clsx";

const baseClasses = clsx(
  "mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm",
  "focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500",
  "dark:border-gray-600 dark:bg-gray-700 dark:text-white",
);

interface InputProps extends ComponentPropsWithRef<"input"> {
  label?: string;
  as?: "input" | "textarea" | "select";
}

const Input = ({ label, as = "input", id, className, ...rest }: InputProps) => {
  const Component = as as ElementType;

  return (
    <div>
      {label && (
        <label
          htmlFor={id}
          className="block text-sm font-medium text-gray-700 dark:text-gray-300"
        >
          {label}
        </label>
      )}
      <Component id={id} className={clsx(baseClasses, className)} {...rest} />
    </div>
  );
};

export default Input;

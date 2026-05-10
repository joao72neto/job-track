import { ComponentPropsWithRef, ElementType } from "react";
import clsx from "clsx";

const baseStyles = clsx(
  "inline-flex items-center justify-center rounded-lg px-5 py-2.5 text-sm font-medium cursor-pointer transition-colors",
);

const variants = {
  primary: clsx(
    baseStyles,
    "bg-blue-600 text-white hover:bg-blue-700 outline-none focus:ring-1 focus:ring-blue-300",
    "dark:focus:ring-blue-800",
  ),
  secondary: clsx(
    baseStyles,
    "border bg-white text-blue-600 hover:bg-gray-100 border-gray-300",
    "dark:hover:bg-gray-700 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-300",
  ),
};

interface ButtonProps extends ComponentPropsWithRef<"button"> {
  variant?: keyof typeof variants;
  as?: "button" | "label";
  className?: string;
}

const Button = ({
  variant = "primary",
  children,
  as = "button",
  className,
  ...rest
}: ButtonProps) => {
  const Component = as as ElementType;

  return (
    <Component className={clsx(variants[variant], className)} {...rest}>
      {children}
    </Component>
  );
};

export default Button;

import { ComponentPropsWithRef, ElementType } from "react";
import clsx from "clsx";

const base = clsx(
  "rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-medium text-white cursor-pointer",
);

const variants = {
  primary: clsx(
    base,
    "hover:bg-blue-700 outline-none focus:ring-1 focus:ring-blue-300",
    "dark:focus:ring-blue-800",
  ),
  secondary: clsx(
    base,
    "border border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-300",
    "dark:hover:bg-gray-700",
  ),
};

interface ButtonProps extends ComponentPropsWithRef<"button"> {
  variant?: keyof typeof variants;
  as?: "button" | "label";
}

const Button = ({
  variant = "primary",
  children,
  as = "button",
  ...rest
}: ButtonProps) => {
  const Component = as as ElementType;

  return (
    <Component className={clsx(base, variants[variant])} {...rest}>
      {children}
    </Component>
  );
};

export default Button;

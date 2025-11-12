import { cva } from "class-variance-authority";
import clsx from "clsx";

type TTag = {
  children: React.ReactNode;
  variant?:
    | "outlineSuccess"
    | "filledSuccess"
    | "outlineDanger"
    | "filledDanger"
    | "outlineSecondary"
    | "filledSecondary";
  size?: "sm" | "md";
};

const tag = cva("text-center py-1 px-2 rounded-sm", {
  variants: {
    variant: {
      outlineSuccess: "text-success-main border border-success-border",
      filledSuccess: "text-neutral-10 bg-success-main ",
      outlineDanger: "text-danger-main border border-danger-border",
      filledDanger: "text-neutral-10 bg-danger-main",
      outlineSecondary: "text-secondary-main border border-secondary-border",
      filledSecondary: "text-neutral-10 bg-secondary-main",
    },
    size: {
      sm: "text-s-bold",
      md: "text-m-bold",
    },
  },
  defaultVariants: {
    variant: "outlineSuccess",
    size: "md",
  },
});

export const Tag = ({ children, variant, size }: TTag) => {
  return <span className={clsx(tag({ variant, size }))}>{children}</span>;
};

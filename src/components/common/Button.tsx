import { cva } from "class-variance-authority";
import clsx from "clsx";
import type React from "react";

type TButtonProps = {
  style?: React.CSSProperties;
  variant: "primary" | "secondary" | "neutral" | "muted";
  size: "sm" | "md" | "lg";
  width: "auto" | "full" | "fit";
  className?: string;
  icon?: React.ElementType;
  iconPosition?: "left" | "right";
  children: React.ReactNode;
} & React.ComponentPropsWithoutRef<"button">;

const button = cva(
  "rounded-[8px] font-bold shadow-[0_1px_2px_0_rgba(0,0,0,0.12)]",
  {
    variants: {
      variant: {
        primary: "bg-primary-main text-neutral-10",
        secondary: "bg-secondary-main text-neutral-90",
        neutral: "bg-neutral-10 text-neutral-100 border border-neutral-40",
        muted:
          "bg-neutral-30 text-neutral-60 border border-neutral-40 cursor-not-allowed",
      },
      size: {
        sm: "px-4 py-1 text-s",
        md: "px-4 py-1 text-m",
        lg: "px-4 py-[6px] text-l",
      },
      width: {
        auto: "w-auto",
        full: "w-full",
        fit: "w-fit",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
      width: "auto",
    },
  }
);

export const Button = ({
  style,
  variant,
  size,
  width,
  className,
  icon: Icon,
  iconPosition = "left",
  children,
}: TButtonProps) => {
  return (
    <button
      style={style}
      className={clsx(button({ variant, size, width }), className)}
    >
      {Icon && iconPosition === "left" && <Icon className="mr-1" />}
      {children}
      {Icon && iconPosition === "right" && <Icon />}
    </button>
  );
};

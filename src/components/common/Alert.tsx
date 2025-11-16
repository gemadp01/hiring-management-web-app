import { cva } from "class-variance-authority";
import clsx from "clsx";

const alertContainer = cva(
  "flex justify-center items-center mb-2 p-1 rounded-sm",
  {
    variants: {
      variant: {
        success: "bg-success-surface border border-success-main",
        danger: "bg-danger-surface border border-danger-main",
      },
    },
    defaultVariants: {
      variant: "success",
    },
  }
);

const alertText = cva("text-center", {
  variants: {
    variant: {
      success: "text-success-main",
      danger: "text-danger-main",
    },
  },
  defaultVariants: {
    variant: "success",
  },
});

type TAlertProps = {
  message: string;
  variant?: "success" | "danger";
};

export const Alert = ({ message, variant }: TAlertProps) => {
  return (
    <div className={clsx(alertContainer({ variant }))}>
      {/* <ExclamationTriangleIcon className="w-5 h-5 text-danger-main mr-2" /> */}
      <p className={clsx(alertText({ variant }))}>{message}</p>
    </div>
  );
};

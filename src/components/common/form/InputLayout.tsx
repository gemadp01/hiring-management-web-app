// import { useState } from "react";

type TInputLayout = {
  label?: string;
  inputRequired?: boolean;
  type: string;
  placeholder?: string;
  inputIconSupport?: string;
  helperMessage?: string;
  helperIconSupport?: string;
  errorMessage?: string;
  disabled?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
} & React.ComponentPropsWithoutRef<"input">;

const InputLayout = ({
  label,
  inputRequired = false,
  type = "text",
  placeholder,
  inputIconSupport,
  helperMessage,
  // helperIconSupport,
  errorMessage,
  disabled = false,
  onChange,
}: TInputLayout) => {
  // const [isFocused, setIsFocused] = useState(false);

  return (
    <>
      <div className="mb-4">
        <label className="block mb-2 text-s-regular text-neutral-90">
          {label}
          {inputRequired && <span className="text-danger-main">*</span>}
        </label>

        <div
          // className={`relative flex items-center mb-2 border-2 border-neutral-40 rounded-lg bg-white ${
          //   isFocused ? "border-primary-main" : "text-neutral-90"
          // } ${disabled ? "bg-neutral-30" : ""}`}
          className="relative flex items-center mb-2 border-2 border-neutral-40 rounded-lg bg-neutral-10"
        >
          {inputIconSupport && (
            <div className="flex items-center justify-center pl-4 py-3 font-bold">
              {inputIconSupport}
            </div>
          )}

          <input
            type={type}
            // onFocus={() => setIsFocused(true)}
            // onBlur={() => setIsFocused(false)}
            placeholder={placeholder}
            // className={`w-full py-2 bg-transparent focus:outline-none placeholder-neutral-60 ${
            //   disabled && "cursor-not-allowed"
            // }`}
            onChange={onChange}
            className={`w-full py-2 ${
              inputIconSupport ? "px-2" : "px-4"
            } bg-transparent focus:outline-none placeholder-neutral-60`}
            disabled={disabled}
          />
        </div>

        {/* Helper Message and Counter */}
        <div
          className={`flex items-center justify-between mt-2 text-s-regular ${
            errorMessage ? "text-danger-main" : "text-neutral-70"
          }`}
        >
          <span className="flex items-center">
            {/* <div className="w-5 h-5 rounded-full border-2 border-gray-400 mr-2"></div> */}
            {helperMessage}
          </span>
        </div>
      </div>
    </>
  );
};

export default InputLayout;

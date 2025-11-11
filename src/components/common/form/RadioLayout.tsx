type TRadioProps = {
  optionValue: string;
  disabled?: boolean;
  checked?: boolean;
  onChange?: (value: string) => void;
};

type TRadioStateProps = {
  disabled?: boolean;
};

const RadioState = ({ disabled }: TRadioStateProps) => {
  const baseClass = "relative w-5 h-5 rounded-full border-2 transition";
  const innerClass = "absolute inset-0.5 rounded-full transition-transform";

  if (disabled) {
    return (
      <span className={`${baseClass} border-neutral-60 cursor-not-allowed`}>
        <span className={`${innerClass} bg-neutral-60`} />
      </span>
    );
  }

  return (
    <span className={`${baseClass} border-neutral-90`}>
      <span
        className={`${innerClass} bg-primary-main scale-0 peer-checked:scale-100`}
      />
    </span>
  );
};

export const RadioLayout = ({
  optionValue,
  disabled = false,
  checked,
  onChange,
}: TRadioProps) => {
  return (
    <label className="flex items-center cursor-pointer">
      <input
        type="radio"
        name="optionProfile"
        className="hidden peer"
        value={optionValue}
        disabled={disabled}
        checked={checked}
        onChange={() => onChange?.(optionValue)}
      />
      <RadioState disabled={disabled} />
      <span className="ml-2">{optionValue}</span>
    </label>
  );
};

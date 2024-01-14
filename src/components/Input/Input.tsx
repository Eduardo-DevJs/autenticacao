import { ChangeEvent } from "react";

interface InputProps {
  type?: string;
  placeholder?: string;
  value?: string
  onChange: (e: ChangeEvent<HTMLInputElement>) => void
}

const Input = ({ type, placeholder, value, onChange}: InputProps) => {
  return (
    <input
      className="w-full outline-none border py-2 px-2 font-medium text-black text-base"
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
    />
  );
};

export default Input;

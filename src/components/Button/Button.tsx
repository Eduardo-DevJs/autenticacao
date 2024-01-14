interface ButtonProps {
  type: "submit" | "reset" | "button" 
  children: string
}

const Button = ({type, children}: ButtonProps) => {
  return (
    <button type={type} className="w-full font-medium p-2 rounded bg-green-500 text-white">
      {children}
    </button>
  );
};

export default Button;

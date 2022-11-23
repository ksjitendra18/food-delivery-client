const Button = ({ className, children }) => {
  console.log(className);
  return (
    <button
      className={`${className} rounded-full py-2 px-6 md:px-10  bg-transparent border-solid border-white border-3`}
    >
      {children}
    </button>
  );
};

export default Button;

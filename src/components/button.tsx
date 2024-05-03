export const Button = ({ children }: { children: React.ReactNode }) => {
  return (
    <button className="bg-white text-black text-sm rounded py-3 px-4 whitespace-nowrap	">
      {children}
    </button>
  );
};

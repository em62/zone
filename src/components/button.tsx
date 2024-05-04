type Props = {
  children: React.ReactNode
  onClick?: () => void
}

export const Button = ({ children, onClick }: Props) => {
  return (
    <button className="bg-white text-black text-sm rounded py-3 px-4 whitespace-nowrap" onClick={onClick}>
      {children}
    </button>
  )
}

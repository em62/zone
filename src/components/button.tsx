type Props = {
  children: React.ReactNode
  onClick?: () => void
}

export const Button = ({ children, onClick }: Props) => {
  return (
    <button className="whitespace-nowrap rounded bg-white px-4 py-3 text-sm text-black" onClick={onClick}>
      {children}
    </button>
  )
}

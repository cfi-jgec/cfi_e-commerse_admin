
type props = {
  children: React.ReactNode,
  header: string,
  className?: string
}

const Layout = ({ children, header, className }: props) => {
  return (
    <div className={`w-full h-full p-6 ${className}`}>
      <h1 className="font-semibold text-lg capitalize mb-2">
        {header}
      </h1>
      {children}
    </div>
  );
};

export default Layout;

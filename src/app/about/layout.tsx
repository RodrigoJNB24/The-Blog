type RootLayoutProps = {
  children: React.ReactNode;
};

export default function RootLayout({ children }: Readonly<RootLayoutProps>) {
  return (
    <>
      <h1>Aqui vem layout do about</h1>

      {children}
    </>
  );
}

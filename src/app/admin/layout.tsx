import { MenuAdmin } from '../../components/Admin/MenuAdmin';

type AdminLayoutProps = {
  children: React.ReactNode;
};

export default async function AdminLayout({
  children,
}: Readonly<AdminLayoutProps>) {
  return (
    <>
      <MenuAdmin />
      {children}
    </>
  );
}

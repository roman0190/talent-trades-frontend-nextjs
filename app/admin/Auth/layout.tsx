import NavNoLogin from "../components/NavNoLogin";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section>
      <NavNoLogin />
      {children}
    </section>
  );
}

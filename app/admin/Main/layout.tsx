import Nav from "../components/Nav";
import Session from "../components/session";


export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section>
      <Session>
          <Nav />
          {children}
      </Session>
    </section>
    
  );
}

import { Footer } from "./Footer";
import { Sidebar } from "./Sidebar";

const zhangsan = "zhangsan";

export function AppLayout({ children }) {
  return (
    <>
      <main className="app-main">{children}</main>
      <Sidebar />
      <Footer name={zhangsan} />
    </>
  );
}

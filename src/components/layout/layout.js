import Header from "./header";
import Footer from "./footer";
const Layout = ({ children }) => {
  return (
    <>
      <Header />
      {/* <main className="p-6 md:p-9 md:px-11">{children}</main> */}
      <main >{children}</main>
      <Footer />
    </>
  );
};

export default Layout;

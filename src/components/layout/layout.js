import Header from "./header";
import Footer from "./footer";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

const Layout = ({ children }) => {
  return (
    <>
      <Header />
      {/* <main className="p-6 md:p-9 md:px-11">{children}</main> */}
      <main>
        
      <ToastContainer
        position="top-right"
        autoClose={1500}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        // pauseOnFocusLoss
        draggable
        pauseOnHover={false}
        theme="light"
      />
        {children}
        </main>
      <Footer />
    </>
  );
};

export default Layout;

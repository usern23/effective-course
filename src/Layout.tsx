import { Outlet } from "react-router-dom";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import { ToastContainer } from "react-toastify";

function Layout() {
    return (
        <>
            <Header />
            <main>
                <Outlet /> 
            </main>
            <Footer />
            <ToastContainer/>
        </>
    );
}

export default Layout;
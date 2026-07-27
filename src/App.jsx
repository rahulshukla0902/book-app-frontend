import "./App.css";
import { Outlet } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { AuthProvider } from "./context/AuthContext";
import Aurora from "./components/Aurora";

function App() {
  return (
    <>
      <AuthProvider>
        {/* Background Aurora Effect */}
        <div className="fixed top-0 left-0 w-full h-full z-0 pointer-events-none">
          <Aurora colorStops={['#40e325', '#c699f2', '#4319f0']} speed={0.75} amplitude={0.8} blend={1.2} />
        </div>

        {/* Main Content */}
        <div>
          <Navbar />
          <div
            className="
              relative
              z-10
              flex
              flex-col
              mt-[20vh]
              h-[calc(100vh-20vh)]
              w-full
              overflow-hidden
            "
          >
            <main
              className="
                flex-1
                overflow-y-auto
                [scrollbar-width:none]
                max-w-screen-2xl
                mx-auto
                w-full
                px-6
                pb-16
                font-primary
              "
            >
              <Outlet />
            <Footer />
            </main>
          </div>
        </div>
      </AuthProvider>
    </>
  );
}

export default App;

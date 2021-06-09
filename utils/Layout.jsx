import Nav from "../components/Nav";
import { useContext } from "react";
import SubjectCreateModal from "../components/SubjectCreateModal";
import { useRouter } from "next/router";
import Context from "./Context";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Layout({ children }) {
  const { error, info, setError, setInfo } = useContext(Context);
  if (error) {
    toast.error(error, {
      position: "bottom-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
    setError(null);
  }
  if (info) {
    toast.info(info, {
      position: "bottom-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
    setInfo(null);
  }
  if (useRouter().pathname == "/login")
    return (
      <>
        {children}
        <ToastContainer />
      </>
    );
  return (
    <>
      <Nav />
      <main>{children}</main>
      <ToastContainer />
    </>
  );
}

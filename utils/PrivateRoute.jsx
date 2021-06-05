import { useRouter } from "next/router";
import { useContext } from "react";
import { useSession } from "next-auth/client";

export default function PrivateRoute({ children }) {
  const router = useRouter();
  const [session, loading] = useSession();
  //   const { user } = useContext(Context);
  //   if (loading) return <Loader />;
  if (!loading) {
    if (session) {
      console.log(Math.random());
      console.log("IN SESSION", session);
      return children;
    } else {
      console.log(Math.random());
      console.log("IN ELSE");
      router.push("/login");
      return <>Tum auth nahi ho</>;
    }
  }
  return <>HI</>;
}

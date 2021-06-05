import { getSession } from "next-auth/client";
import { useRouter } from "next/router";

export default function withAuth({ Component, pageProps }) {
  const router = useRouter();
  if (pageProps?.session) return <Component {...pageProps} />;
  router.push("/login");
}
export const getServerSideProps = async (ctx) => {
  return { session: await getSession(ctx) };
};

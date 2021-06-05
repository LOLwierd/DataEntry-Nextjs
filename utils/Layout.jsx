import Nav from '../components/Nav'
import SubjectCreateModal from '../components/SubjectCreateModal'
import { useRouter } from "next/router";
export default function Layout({ children }) {
  if(useRouter().pathname == '/login')
  return (<>{children}</>)
  

  return(
    <>
      <SubjectCreateModal />
      <Nav />
      <main>{children}</main>
    </>
  )
}

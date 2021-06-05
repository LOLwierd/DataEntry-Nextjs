import Nav from '../components/Nav'
import SubjectCreateModal from '../components/SubjectCreateModal'

export default function Layout({ children }) {
  return (
    <>
      <SubjectCreateModal />
      <Nav />
      <main>{children}</main>
    </>
  );
}

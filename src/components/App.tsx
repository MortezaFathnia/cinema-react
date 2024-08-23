import Background from "./search-form/Background";
import Container from "./Layout/Container";
import Footer from "./Layout/footer/Footer";
import Header, { HeaderTop } from "./Layout/header/Header";
import Logo from "./Layout/header/Logo";
import SearchForm from "./search-form/SearchForm";
import { SidebarTop } from "./sidebar/Sidebar";
import PaginationControls from "./pagination/PaginationControls";
import ResultsCount from "./pagination/ResultsCount";
import SortingControls from "./sorting-controls/SortingControls";
import { Toaster } from "react-hot-toast";
import ShowListSearch from "./show-list/ShowListSearch";
import ShowingControls from "./showing-controls/showing-controls";
import FilteringControls from "./filtering-controls/filtering-controls";

function App() {
  return (
    <>
      <Background />

      <Header>
        <HeaderTop>
          <Logo />
        </HeaderTop>

        <SearchForm />


      </Header>

      <Container>
        <SidebarTop>
          <ResultsCount />
          <FilteringControls />
          <div style={{ display: 'flex' }}>
            <ShowingControls />
            <SortingControls />
          </div>
        </SidebarTop>
        <ShowListSearch />
        <PaginationControls />
      </Container>

      <Footer />

      <Toaster position="top-right" />
    </>
  );
}

export default App;

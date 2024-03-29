import { useContext } from "react";
import {
  AppWrapper,
  BadRequest,
  Definitions,
  GlobalStyles,
  Header,
  InputForm,
  Reset,
  Source,
  Spinner,
} from "./components";
import { FontContext } from "./context/FontContext";
import { useSelector } from "react-redux";
import { RootState } from "./store/state";

const App = () => {
  const context = useContext(FontContext);
  const font = context?.currentFont || "sans";
  const isLoading = useSelector((state: RootState) => state.dictionary.loading);
  const error = useSelector((state: RootState) => state.dictionary.error);
  const isBadRequest = error === "ERR_BAD_REQUEST";

  return (
    <AppWrapper>
      <Reset />
      <GlobalStyles $font={font} />

      <header>
        <h1 className="sr-only">Dictionary</h1>

        <Header />
      </header>

      <main>
        <InputForm />

        {isLoading && <Spinner />}
        {!isLoading && !isBadRequest && (
          <>
            <Definitions />
            <Source />
          </>
        )}
        {isBadRequest && <BadRequest />}
      </main>
    </AppWrapper>
  );
};
export default App;

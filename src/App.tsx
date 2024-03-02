import { useContext } from "react";
import {
  AppWrapper,
  Definitions,
  GlobalStyles,
  Header,
  InputForm,
  Reset,
  Spinner,
} from "./components";
import { FontContext } from "./context/FontContext";
import { useSelector } from "react-redux";
import { RootState } from "./store/state";

const App = () => {
  const context = useContext(FontContext);
  const font = context?.currentFont || "sans";
  const isLoading = useSelector((state: RootState) => state.dictionary.loading);

  return (
    <AppWrapper>
      <GlobalStyles $font={font} />
      <Reset />

      <Header />

      <InputForm />

      {isLoading ? <Spinner /> : <Definitions />}
    </AppWrapper>
  );
};
export default App;

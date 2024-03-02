import { useContext } from "react";
import { AppWrapper, GlobalStyles, Header, Reset } from "./components";
import { FontContext } from "./context/FontContext";

const App = () => {
  const context = useContext(FontContext);
  const font = context?.currentFont || "sans";

  return (
    <AppWrapper>
      <GlobalStyles $font={font} />
      <Reset />

      <Header />
    </AppWrapper>
  );
};
export default App;

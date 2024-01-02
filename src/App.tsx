import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { Global, css } from "@emotion/react";
import { Wrapper } from "./App.styles";
import { Navigation } from "./components/Navigation";
import { ROUTES } from "./config/routes";

const router = createBrowserRouter(ROUTES);

function App() {
  return (
    <Wrapper>
      <Global
        styles={css`
          body,
          html {
            margin: 0;
          }
          html { height: 100%; }
          body { min-height: 100%; }
          #root {
            height: 100%;
          }
        `}
      />
      <aside>
        <Navigation routes={ROUTES} />
      </aside>
      <main>
        <RouterProvider router={router} />
      </main>
    </Wrapper>
  );
}

export default App;

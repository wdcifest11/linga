import { Suspense } from "react";
import { createRoot } from "react-dom/client";
import "./index.scss";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { IsMobileProvider } from "./Context"; // Import the provider
import Navbar from "./components/Navbar";
import Loading from "./components/Loading";

createRoot(document.getElementById("root")!).render(
    <IsMobileProvider>
      <BrowserRouter>
        <Suspense fallback={<Loading />}>
         <Navbar />
          <App />
        </Suspense>
      </BrowserRouter>
    </IsMobileProvider>
);

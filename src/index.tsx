import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App.tsx";
import Header from "./components/Header.tsx";
import Form from "./components/Form.tsx";
import ProjectDisplay from "./components/Display.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <meta name="viewport" content="initial-scale=1, width=device-width" />
    <div className="ml-2 mr-2">
      <BrowserRouter basename="/project-board/">
      <App/>
        <Routes>
          <Route path="/" element={<Header />}>
            <Route index path="" element={<Form />}/>
            <Route path="display" element={<ProjectDisplay />}/>
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  </React.StrictMode>
);

import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ContactPage, Home } from "../../modules";

export const RouteProvider = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/contact" element={<ContactPage />} />
      </Routes>
    </BrowserRouter>
  );
};

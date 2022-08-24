import { BrowserRouter, Routes, Route } from "react-router-dom";
import {
  ContactDetailsPage,
  ContactListPage,
  Home,
  ContactGroupDetailsPage,
  ContactGroupListPage,
} from "../../modules";

export const RouteProvider = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/contact" element={<ContactListPage />} />
        <Route path="/contact/:id" element={<ContactDetailsPage />} />
        <Route path="/group" element={<ContactGroupListPage />} />
        <Route path="/group/:id" element={<ContactGroupDetailsPage />} />
      </Routes>
    </BrowserRouter>
  );
};

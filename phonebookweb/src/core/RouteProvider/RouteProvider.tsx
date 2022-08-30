import { BrowserRouter, Routes, Route } from "react-router-dom";
import {
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
        {/* <Route path="/group" element={<ContactGroupListPage />} />
        <Route path="/group/:id" element={<ContactGroupDetailsPage />} /> */}
      </Routes>
    </BrowserRouter>
  );
};

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AppLayout } from "./components/AppLayout";
import Dashboard from "./pages/Dashboard";
import Billing from "./pages/Billing";
import Patients from "./pages/Patients";
import PatientProfile from "./pages/PatientProfile";
import SessionNote from "./pages/SessionNote";
import NoteTemplates from "./pages/NoteTemplates";
import BookAppointment from "./pages/BookAppointment";
import IntakeForm from "./pages/IntakeForm";
import Integrations from "./pages/Integrations";
import Login from "./pages/Login";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route element={<AppLayout />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/billing" element={<Billing />} />
          <Route path="/patients" element={<Patients />} />
          <Route path="/patients/:id" element={<PatientProfile />} />
          <Route path="/session-note" element={<SessionNote />} />
          <Route path="/note-templates" element={<NoteTemplates />} />
          <Route path="/book-appointment" element={<BookAppointment />} />
          <Route path="/intake" element={<IntakeForm />} />
          <Route path="/integrations" element={<Integrations />} />
          <Route path="/messages" element={<div className="p-12 text-center text-on-surface-variant font-serif italic text-2xl">Messaging Sanctuary coming soon...</div>} />
          <Route path="/settings" element={<div className="p-12 text-center text-on-surface-variant font-serif italic text-2xl">Portal Settings coming soon...</div>} />
        </Route>
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

import JobListPage from "@/pages/admin/JobListPage";
import ManageJobPage from "@/pages/admin/ManageJobPage";
import JobListingPage from "@/pages/applicant/JobListingPage";
import ResumePage from "@/pages/applicant/ResumePage";
import VerifiedPage from "@/pages/applicant/VerifiedPage";
import LoginPage from "@/pages/LoginPage";
import RegisterPage from "@/pages/RegisterPage";
import { supabase } from "@/supabase-client";
import { useEffect, useState } from "react";
import { Navigate, Route, Routes } from "react-router";

function App() {
  const [session, setSession] = useState<unknown>(null);

  const fetchSession = async () => {
    const currentSession = await supabase.auth.getSession();
    const { id, email } = currentSession.data.session?.user ?? {};

    const { data: role, error } = await supabase
      .from("profiles")
      .select("role")
      .eq("id", id);

    localStorage.setItem("current-user", JSON.stringify({ id, email, role }));

    if (error) {
      console.log("Error fetching session:", error);
    }

    setSession(currentSession.data);
  };

  useEffect(() => {
    fetchSession();
  }, []);

  return (
    <>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        <Route path="/admin">
          <Route path="job-list" element={<JobListPage />} />
          <Route path="manage-job/:slug" element={<ManageJobPage />} />
        </Route>

        <Route path="/applicant">
          <Route path="job-listing" element={<JobListingPage />} />
          <Route path="resume/:id" element={<ResumePage />} />
          <Route path="verified" element={<VerifiedPage />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;

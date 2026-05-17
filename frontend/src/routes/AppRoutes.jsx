import { Suspense, lazy } from "react";
import {
  Route,
  Routes,
  Navigate,
} from "react-router-dom";

const Profile = lazy(() =>
  import("../components/Profile")
);

const EditNote = lazy(() =>
  import("../pages/EditNotePage")
);

const AddNotesPage = lazy(() =>
  import("../pages/AddNotePage")
);

import Login from "../components/auth/Login";
import SignUp from "../components/auth/SignUp";

import Index from "../components/UI/Index";

import ProtectedRoute from "./ProtectedRoute";
import PublicRoute from "./PubicRoute";

import NotesPage from "../pages/NotesPage";

const AppRoutes = () => {

  return (
    <Suspense fallback={<h1>Loading...</h1>}>

      <Routes>

        {/* PUBLIC ROUTES */}
        <Route
          path="/login"
          element={
            <PublicRoute>
              <Login />
            </PublicRoute>
          }
        />

        <Route
          path="/signup"
          element={
            <PublicRoute>
              <SignUp />
            </PublicRoute>
          }
        />

        {/* PROTECTED LAYOUT */}
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Index />
            </ProtectedRoute>
          }
        >

          {/* HOME */}
          <Route
            index
            element={<NotesPage />}
          />

          {/* PROFILE */}
          <Route
            path="profile"
            element={<Profile />}
          />

          {/* ADD NOTES */}
          <Route
            path="addnotes"
            element={<AddNotesPage />}
          />

          {/* EDIT NOTE */}
          <Route
            path="editnote"
            element={<EditNote />}
          />

        </Route>

        {/* FALLBACK */}
        <Route
          path="*"
          element={
            <Navigate
              to="/"
              replace
            />
          }
        />

      </Routes>

    </Suspense>
  );
};

export default AppRoutes;
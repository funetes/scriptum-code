import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, Navigate } from "react-router";
import { RouterProvider } from "react-router/dom";
import "./index.css";
import App from "./components/App.tsx";
import AppLayout from "./components/AppLayout.tsx";
import { scriptService } from "./services/scriptService";
import ScriptListPage from "./pages/ScriptListPage.tsx";
import { AuthProvider } from "./context/AuthContext";
import DetailScriptPage from "./pages/DetailScriptPage.tsx";
import PrivacyPolicyPage from "./pages/PrivacyPolicyPage.tsx";
import TermsOfServicePage from "./pages/TermsOfServicePage.tsx";

const router = createBrowserRouter([
  {
    Component: AppLayout,
    children: [
      {
        index: true,
        Component: App,
        loader: async () => {
          const [categories, recentScripts] = await Promise.all([
            scriptService.getCategories(),
            scriptService.getRecentScripts(),
          ]);
          return { categories, recentScripts };
        },
      },
      {
        path: "/:categoryId",
        Component: ScriptListPage,
        loader: async ({ params }) => {
          const categoryId = params.categoryId as string;
          const categories = await scriptService.getCategories();
          const category = categories.find((c) => c.id === categoryId);

          if (!category) {
            return [];
          }

          const scripts = await scriptService.getScriptsByCategory(
            category.name,
          );
          return { categoryName: category.name, scripts };
        },
      },
      {
        path: ":categoryId/:id",
        Component: DetailScriptPage,
        loader: async ({ params }) => {
          const docId = params.id as string;
          return scriptService.getScriptById(docId);
        },
      },
      {
        path: "/user/:userId",
        async lazy() {
          const { UserPage } = await import("./pages/UserPage");
          return { Component: UserPage };
        },
      },
      {
        path: "*",
        element: <Navigate to="/" replace />,
      },
    ],
  },
  {
    path: "/privacy-policy",
    Component: PrivacyPolicyPage,
  },
  {
    path: "/terms-of-service",
    Component: TermsOfServicePage,
  },
]);

const root = document.getElementById("root");

createRoot(root!).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </StrictMode>,
);

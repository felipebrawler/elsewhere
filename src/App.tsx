import { MotionConfig } from "motion/react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { HomePage } from "@/pages/HomePage";
import { NotFoundPage } from "@/pages/NotFoundPage";

/** Interior routes are code-split; the homepage ships in the main bundle. */
const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      { path: "/", element: <HomePage /> },
      { path: "/play", lazy: async () => ({ Component: (await import("@/pages/PlayIndexPage")).PlayIndexPage }) },
      { path: "/play/:slug", lazy: async () => ({ Component: (await import("@/pages/GameDetailPage")).GameDetailPage }) },
      { path: "/about", lazy: async () => ({ Component: (await import("@/pages/AboutPage")).AboutPage }) },
      { path: "/notes", lazy: async () => ({ Component: (await import("@/pages/NotesPage")).NotesPage }) },
      { path: "*", element: <NotFoundPage /> },
    ],
  },
  // The player is full-bleed: it brings its own chrome via GameShell.
  {
    path: "/play/:slug/play",
    lazy: async () => ({ Component: (await import("@/pages/GamePlayerPage")).GamePlayerPage }),
  },
]);

export function App() {
  return (
    <MotionConfig reducedMotion="user">
      <RouterProvider router={router} />
    </MotionConfig>
  );
}

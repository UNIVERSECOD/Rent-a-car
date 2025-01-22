import { createBrowserRouter } from "react-router-dom";

import { paths } from "@/constants/paths";
import HomePage from "@/pages/(business)/home";
import RootLayout from "@/components/shared/RootLayout";
import { RentListPage } from "@/pages/(business)/list";
import RentDetailPage from "@/pages/(business)/detail";
import PaymentPage from "@/pages/(business)/payment";
import DashboardMainPage from "@/pages/(dashboard)/main";
import DashboardLayout from "@/components/shared/DashboardLayout";

import DashboardRentListPage from "@/pages/(dashboard)/rent/list";
import DashboardLocationPage from "@/pages/(dashboard)/location/list";
import DashboardCategoryPage from "@/pages/(dashboard)/categories/list";

import DashboardRentCreatePage from "@/pages/(dashboard)/rent/create"
import DashboardLocationEditPage from "@/pages/(dashboard)/location/edit"
import DashboardCategoryEditPage from "@/pages/(dashboard)/categories/edit"

import DashboardCategoryCreatePage from "@/pages/(dashboard)/categories/create"
import DashboardLocationCreatePage from "@/pages/(dashboard)/location/create";
import DashboardRentEditPage from "@/pages/(dashboard)/rent/edit";
import AuthLayout from "@/components/shared/AuthLayout";
import ReservationsPage from "@/pages/(business)/reservations";
import DashboardReservationListPage from "@/pages/(dashboard)/reservation/list";
import DashboardReviewListPage from "@/pages/(dashboard)/review/list";
import ChatPage from "@/pages/(dashboard)/chat";
import ProfileEditPage from "@/pages/(business)/profile";
import FavoritesPage from "@/pages/(business)/favorites";

export const router = createBrowserRouter([
  {
    path: "",
    element: <RootLayout />,
    children: [
      {
        path: paths.HOME,
        element: <HomePage />,
      },
      {
        path: paths.LIST,
        element: <RentListPage />,
      },
      {
        path: paths.DETAIL(),
        element: <RentDetailPage />,
      },
      {
        path: paths.PROFILE,
        element: <ProfileEditPage />,
      },
      {
        path: paths.Favorites,
        element: <FavoritesPage />,
      },
      {
        path: "",
        element: <AuthLayout />,
        children: [
          {
            path: paths.PAYMENT(),
            element: <PaymentPage />,
          },
          {
            path: paths.RESERVATIONS,
            element: <ReservationsPage />,
          },
        ],
      },

      {
        path: "",
        element: <DashboardLayout />,
        children: [
          {
            path: paths.DASHBOARD.MAIN,
            element: <DashboardMainPage />,
          },
          {
            path: paths.DASHBOARD.RENTS.LIST,
            element: <DashboardRentListPage />,
          },
          {
            path: paths.DASHBOARD.LOCATIONS.LIST,
            element: <DashboardLocationPage />,
          },
          {
            path: paths.DASHBOARD.LOCATIONS.CREATE,
            element: <DashboardLocationCreatePage />,
          },
          {
            path: paths.DASHBOARD.LOCATIONS.EDIT(),
            element: <DashboardLocationEditPage />,
          },
          {
            path: paths.DASHBOARD.CATEGORIES.LIST,
            element: <DashboardCategoryPage />,
          },
          {
            path: paths.DASHBOARD.CATEGORIES.CREATE,
            element: <DashboardCategoryCreatePage />,
          },
          {
            path: paths.DASHBOARD.CATEGORIES.EDIT(),
            element: <DashboardCategoryEditPage />,
          },
          {
            path: paths.DASHBOARD.RENTS.CREATE,
            element: <DashboardRentCreatePage />,
          },
          {
            path: paths.DASHBOARD.RENTS.EDIT(),
            element: <DashboardRentEditPage />,
          },
          {
            path: paths.DASHBOARD.RESERVATIONS.LIST,
            element: <DashboardReservationListPage />,
          },
          {
            path: paths.DASHBOARD.REVIEWS.LIST,
            element: <DashboardReviewListPage />,
          },
          {
            path: paths.DASHBOARD.CHAT.VIEW,
            element: <ChatPage />,
          },
          {
            path: paths.DASHBOARD.CHAT.USER(),
            element: <ChatPage />,
          },
        ],
      },
    ],
  },
]);

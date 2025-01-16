export const paths = {
  HOME: "/",
  LIST: "/list",
  DETAIL: (id = ":id") => `/detail/${id}`,
  PAYMENT: (id = ":id") => `/payment/${id}`,
  RESERVATIONS: "/reservations",
  DASHBOARD: {
    MAIN: "/dashboard",
    CATEGORIES: {
      LIST: "/dashboard/categories",
      CREATE: "/dashboard/categories/create",
      EDIT: (id = ":id") => `/dashboard/categories/edit/${id}`,
    },
    LOCATIONS: {
      LIST: "/dashboard/location",
      CREATE: "/dashboard/locations/create",
      EDIT: (id = ":id") => `/dashboard/location/edit/${id}`,
    },
    RENTS: {
      LIST: "/dashboard/rents",
      CREATE: "/dashboard/rents/create",
      EDIT: (id = ":id") => `/dashboard/rent/edit/${id}`,
    },
    RESERVATIONS: {
      LIST: "/dashboard/reservations",
    },
    REVIEWS: {
      LIST: "/dashboard/reviews",
    },
    CHAT: {
      VIEW: "/dashboard/chat",
      USER: (id = ":id") => `/dashboard/chat/${id}`,
    },
  },
};

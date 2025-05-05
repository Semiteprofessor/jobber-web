import { fetchBaseQuery } from "@reduxjs/toolkit/query";

const BASE_ENDPOINT = import.meta.env.VITE_BASE_ENDPOINT;

export const baseQuery = fetchBaseQuery({
  baseUrl: `${BASE_ENDPOINT}/api/gateway/v1`,
  prepareHeaders: (headers) => {
    headers.set("Content-Type", "application/json");
    headers.set("Accept", "application/json");
    return headers;
  },
  credentials: "include",
});

import { api } from "@/api/API";
import useSWR from "swr";

export const useCategory = () =>
  useSWR("/admin/category/list", () =>
    api.category.listUsingGet().then((res) => res.data.data)
  );

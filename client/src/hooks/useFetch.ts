import { useEffect, useState } from "react";
import { api } from "../api/http";

export function useFetch<T>(url: string, deps: unknown[] = []) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;
    setLoading(true);
    api
      .get<T>(url)
      .then((res) => active && setData(res.data))
      .catch((err) => active && setError(err.response?.data?.message || "Ma'lumotni olishda xatolik"))
      .finally(() => active && setLoading(false));
    return () => {
      active = false;
    };
  }, deps);

  return { data, loading, error, setData };
}


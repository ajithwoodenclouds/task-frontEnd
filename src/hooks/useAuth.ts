import { useEffect, useState } from "react";
import { User } from "../types/types";
import { getUsers } from "../features/auth/authThunks";


export default function useAuth() {

  const [data, setData] = useState<User[] | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const items = await getUsers();
        setData(items);
      } catch (err : any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return { data, loading, error };
};
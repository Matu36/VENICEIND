import { useMutation, useQuery } from "@tanstack/react-query";
import { VentasAPI } from "../components/api/VentasApi";

const getVentas = async () => {
  const { data } = await VentasAPI.get("/");
  return data;
};

export const useVenta = () => {
  const ventasQuery = useQuery({
    queryKey: ["ventas"],
    queryFn: () => getVentas(),
  });

  return {
    ventasQuery,
  };
};

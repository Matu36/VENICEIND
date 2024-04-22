import React from "react";
import WidgetLg from "./Widgets/WidgetLg";
import WidgetSm from "./Widgets/WidgetSm";
import Chart from "./Widgets/Chart";
import FeaturedInfo from "./Widgets/FeaturedInfo";

export default function AppAdmin({ allUsers }) {
  return (
    <div>
      <FeaturedInfo />
      <Chart
        data={allUsers}
        title="Analítica de Usuarios"
        grid
        dataKey="Active User"
      />
      <WidgetLg />
      <WidgetSm />
    </div>
  );
}

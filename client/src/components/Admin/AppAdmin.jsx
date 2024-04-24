import React from "react";
import WidgetLg from "./Widgets/WidgetLg";
import WidgetSm from "./Widgets/WidgetSm";
import Chart from "./Widgets/Chart";
import FeaturedInfo from "./Widgets/FeaturedInfo";

export default function AppAdmin({ allUsers }) {
  return (
    <div>
      <FeaturedInfo />

      <h3 style={{ color: "black" }}>Análitica de Usuarios</h3>
      <Chart data={allUsers} grid dataKey="Active User" />
      <div className="widgetsContainer">
        <div className="widgetLeft">
          <WidgetSm />
        </div>
        <div className="widgetRight">
          <WidgetLg />
        </div>
      </div>
    </div>
  );
}

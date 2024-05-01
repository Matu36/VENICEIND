const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "ventas",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
      },
      marca: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      codigo: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      costo: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      precio: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      cuota1: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      cuota2: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      saldo: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      comprador: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      vendedor: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
      },
    },
    {
      timestamps: false,
    }
  );
};

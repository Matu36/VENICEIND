const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "Usuarios",
    {
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          notEmpty: true,
          isEmail: true,
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
      nombre: {
        type: DataTypes.STRING,
        defaultValue: null,
      },
      apellido: {
        type: DataTypes.STRING,
        defaultValue: null,
      },
      direccion: {
        type: DataTypes.STRING,
        defaultValue: null,
      },
      telefono: {
        type: DataTypes.STRING,
        defaultValue: null,
      },
      rol: {
        // null: basic user ; false: admin user ; true: super admin user
        type: DataTypes.BOOLEAN,
        defaultValue: null,
      },
      activo: {
        // false: banned/disabled ; true: active
        type: DataTypes.BOOLEAN,
        defaultValue: true,
        allowNull: false,
      },
      baneado: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        allowNull: false,
      },
    },
    {
      updatedAt: false,
    }
  );
};

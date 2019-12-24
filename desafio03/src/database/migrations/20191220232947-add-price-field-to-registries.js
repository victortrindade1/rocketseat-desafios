module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('registries', 'price', {
      type: Sequelize.DECIMAL(12, 2),
      allowNull: false,
    });
  },

  down: queryInterface => {
    return queryInterface.removeColumn('registries', 'price');
  },
};

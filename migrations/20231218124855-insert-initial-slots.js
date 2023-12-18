module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Slots', [
      { id: 'c059c318-ebbf-4e76-a1cf-63c3d4c6a44d', batch: '6-7AM', price: 500, createdAt: new Date(), updatedAt: new Date() },
      { id: '2a46289b-0833-4e67-b303-3e62353b31a9', batch: '7-8AM', price: 500, createdAt: new Date(), updatedAt: new Date() },
      { id: '4ff73887-129a-4c42-b729-0a6ff2e8d123', batch: '8-9AM', price: 500, createdAt: new Date(), updatedAt: new Date() },
      { id: '7c7c4e3a-982b-41c4-b19b-4c0db6a4a234', batch: '5-6PM', price: 500, createdAt: new Date(), updatedAt: new Date() },
    ]);
  },

  down: async (queryInterface) => {
    await queryInterface.bulkDelete('Slots', null, {});
  },
};

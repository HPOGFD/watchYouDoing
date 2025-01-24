import { Model, DataTypes, Sequelize } from 'sequelize';

class Watchlist extends Model {
  public movieId!: number; // Refers to the ID of a movie in the Movie model
}

// Initialize model
const initModel = (sequelizeInstance: Sequelize) => {
  Watchlist.init(
    {
      movieId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      sequelize: sequelizeInstance,
      modelName: 'Watchlist',
    }
  );
};

export { Watchlist, initModel };

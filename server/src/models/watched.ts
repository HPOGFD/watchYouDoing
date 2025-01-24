import { Model, DataTypes, Sequelize } from 'sequelize';

class WatchList extends Model {
  public movieId!: number; // Refers to the ID of a movie in the Movie model
}

// Initialize model
const initModel = (sequelizeInstance: Sequelize) => {
  WatchList.init(
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

export { WatchList, initModel };

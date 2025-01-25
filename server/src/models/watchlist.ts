import { Model, DataTypes, Sequelize } from 'sequelize';

class WatchList extends Model {
  movieId!: number;
}

// Initialize model
const initModel = (sequelizeInstance: Sequelize) => {
  WatchList.init(
    {
      movieId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'Movies',
          key: 'id',
        },
      },
    },
    {
      sequelize: sequelizeInstance,
      modelName: 'WatchList',
    }
  );
};

export { WatchList, initModel };

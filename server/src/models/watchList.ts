import { Model, DataTypes, Sequelize } from 'sequelize';


class Watchlist extends Model {
  static initModel(_sequelize: Sequelize) {
    throw new Error('Method not implemented.');
  }
  public movieId!: number;
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

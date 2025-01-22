import { Model, DataTypes, Sequelize } from 'sequelize';


class SeenIt extends Model {
  static initModel(_sequelize: Sequelize) {
    throw new Error('Method not implemented.');
  }
  public movieId!: number;
}

// Initialize model
const initModel = (sequelizeInstance: Sequelize) => {
  SeenIt.init(
    {
      movieId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      sequelize: sequelizeInstance,
      modelName: 'SeenIt',
    }
  );
};

export { SeenIt, initModel };

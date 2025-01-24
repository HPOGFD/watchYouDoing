import { Model, DataTypes, Sequelize } from 'sequelize';

class SeenIt extends Model {
  public movieId!: number; // Refers to the ID of a movie in the Movie model
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

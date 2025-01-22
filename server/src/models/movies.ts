import { Model, DataTypes, Sequelize } from 'sequelize';


class Movie extends Model {
  public title!: string;
  public genre!: string;
  public description!: string;
  public releaseDate!: string;
  public streamingStatus!: string;
  static initModel: any;
}

// Initialize model
const initModel = (sequelizeInstance: Sequelize) => {
  Movie.init(
    {
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      genre: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      releaseDate: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      streamingStatus: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize: sequelizeInstance,
      modelName: 'Movie',
    }
  );
};

export { Movie, initModel };

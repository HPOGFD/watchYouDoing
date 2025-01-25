import { Model, DataTypes, Sequelize } from 'sequelize';

interface MovieAttributes {
  title: string;
  genre: string;
  description: string;
  releaseDate: string;
  streamingStatus: string;
  status: 'seen' | 'watchlist';
}

class Movie extends Model<MovieAttributes> implements MovieAttributes {
  public title!: string;
  public genre!: string;
  public description!: string;
  public releaseDate!: string;
  public streamingStatus!: string;
  public status!: 'seen' | 'watchlist';
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
      status: {
        type: DataTypes.ENUM('seen', 'watchlist'),
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

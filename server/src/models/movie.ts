import { Model, DataTypes, Sequelize } from 'sequelize';

interface MovieAttributes {
  id?: number; // Add this line for the primary key
  title: string;
  genre: string;
  description: string;
  releaseDate: string;
  streamingStatus: string;
  status: 'seen' | 'watchlist';
  createdAt?: Date; // Add this line for timestamps
  updatedAt?: Date; // Add this line for timestamps
}

class Movie extends Model<MovieAttributes> implements MovieAttributes {
  public id!: number; // Add this line
  public title!: string;
  public genre!: string;
  public description!: string;
  public releaseDate!: string;
  public streamingStatus!: string;
  public status!: 'seen' | 'watchlist';
  public readonly createdAt!: Date; // Add this line
  public readonly updatedAt!: Date; // Add this line
}

// Initialize model
const initModel = (sequelizeInstance: Sequelize) => {
  Movie.init(
    {
      id: { // Add this block
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
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
        type: DataTypes.DATEONLY, // Changed to DATEONLY
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
      // timestamps: true, // This is true by default, so you can omit it
    }
  );
};

export { Movie, initModel };

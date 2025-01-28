import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/connection.js';

class Index extends Model {
  public id!: number;
  public title!: string;
  public genre!: string;
  public description!: string;
  public releaseDate!: string;
  public streamingStatus!: string;
}

Index.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
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
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    streamingStatus: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: 'Movies', // The table name can be "Movies" or "Index" depending on preference
  }
);

// Ensure you export your model
export default Index; // Use default export

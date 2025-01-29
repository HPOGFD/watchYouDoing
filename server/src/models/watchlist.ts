import { Model, DataTypes, Sequelize } from 'sequelize';

class WatchList extends Model {
  movieId!: number;
  dateAdded!: Date;
  priority!: string;
  notes!: string;
  rating!: number;
  comment!: string;  // Add the comment field here
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
      dateAdded: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
      },
      priority: {
        type: DataTypes.ENUM('Low', 'Medium', 'High'),
        allowNull: false,
        defaultValue: 'Medium',
      },
      notes: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      rating: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      comment: {  // Define the comment field here
        type: DataTypes.TEXT,
        allowNull: true, // If optional, set it to true, otherwise false
      },
    },
    {
      sequelize: sequelizeInstance,
      modelName: 'WatchList',
      tableName: 'WatchLists', // Explicitly set table name
    }
  );
};

export { WatchList, initModel };

import { Model, DataTypes, Sequelize } from 'sequelize';

class SeenIt extends Model {
  movieId!: number;
  viewedDate!: Date;
  rating!: number;
  comment!: string;
}

// Initialize model
const initModel = (sequelizeInstance: Sequelize) => {
  SeenIt.init(
    {
      movieId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'Movies', // Change from 'Movie' to 'Movies'
          key: 'id',
        },
      },
      viewedDate: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      rating: {
        type: DataTypes.INTEGER,
        validate: { min: 0, max: 10 },
      },
      comment: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
    },
    {
      sequelize: sequelizeInstance,
      modelName: 'SeenIt',
      tableName: 'SeenIts', // Explicitly set table name
    }
  );
};

export { SeenIt, initModel };
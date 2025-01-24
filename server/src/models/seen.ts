import { Model, DataTypes, Sequelize,  } from 'sequelize';

interface SeenItAttributes {
  movieId: number;
  viewedDate: Date;
  rating: number;
  comment?: string;
}

class SeenIt extends Model<SeenItAttributes, Omit<SeenItAttributes, 'id'>> {
  public movieId!: number;
  public viewedDate!: Date;
  public rating!: number;
  public comment?: string;
}

const initModel = (sequelizeInstance: Sequelize) => {
  SeenIt.init(
    {
      movieId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      viewedDate: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      rating: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      comment: {
        type: DataTypes.TEXT,
        allowNull: true,
      }
    },
    {
      sequelize: sequelizeInstance,
      modelName: 'SeenIt',
    }
  );
};

export { SeenIt, initModel };
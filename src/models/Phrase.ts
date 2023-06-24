import {Model, DataTypes } from "sequelize";
import {sequelize} from  '../database/postgres';

export interface PhraseInstance extends Model{
    id: number,
    author: string,
    txt: string
};

export const Phease = sequelize.define<PhraseInstance>('Phrase', {
    id: {
        primaryKey: true,
        autoIncrement: true,
        type: DataTypes.INTEGER
    },

    author: {
      type: DataTypes.STRING
    },

    txt: {
        type: DataTypes.STRING
    },
      
    }, {
        tableName: 'phrase',
        timestamps: false
    });


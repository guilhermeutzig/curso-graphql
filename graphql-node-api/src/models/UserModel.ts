import { ModelsInterface } from './../interfaces/ModelsInterface';
import * as Sequelize from 'sequelize';
import { genSaltSync, hashSync, compareSync } from 'bcryptjs';

import { BaseModelInterface } from './../interfaces/BaseModelInterface';

export interface UserAttributes {
    id?: number;
    name?: string;
    email?: string;
    password?: string;
    photo?: string;
    createdAt?: string;
    updatedAt?: string;
}

export interface UserInstance extends Sequelize.Instance<UserAttributes>, UserAttributes {
    // Verificar se os passwords estão batendo  
    isPassword(encodedPassword: string, password: string): boolean;
}

export interface UserModel extends BaseModelInterface, Sequelize.Model<UserInstance, UserAttributes>  {}

export default (sequelize: Sequelize.Sequelize, DataTypes: Sequelize.DataTypes): UserModel => {
    
    const User: UserModel = sequelize.define("User", {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
      },
      name: {
        type: DataTypes.STRING(128),
        allowNull: false
      },
      email: {
        type: DataTypes.STRING(128),
        allowNull: false,
        unique: true
      },
      password: {
        type: DataTypes.STRING(128),
        allowNull: false,
        validate: {
          notEmpty: true
        }
      },
      photo: {
        type: DataTypes.BLOB({
            length: 'long'
        }),
        allowNull: true,
        defaultValue: null
      }
    }, {
        tableName: 'users',
        hooks: {
            // Método beforeCreate é acionado antes de salvar os dados na tabela do mySQL
            beforeCreate: (user: UserInstance, options: Sequelize.CreateOptions): void => {
                // salt seria a key de valor randômico gerada pela função genSaltSync()
                const salt = genSaltSync();
                user.password = hashSync(user.password, salt);
            }
        }
    });

    User.associate = (models: ModelsInterface): void => {}

    User.prototype.isPassword = (encodedPassword: string, password: string): boolean => {
        return compareSync(password, encodedPassword);
    };

    return User;

}
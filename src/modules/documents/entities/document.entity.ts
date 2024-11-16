import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import { User } from "src/modules/user";

@Table({tableName: "Document", timestamps: true})
export class Document extends Model {
    @Column({type: DataType.STRING, allowNull: false})
    name: string;

    @Column({type: DataType.STRING, allowNull: false})
    file: string


    @ForeignKey(()=>User)
    @Column({type: DataType.INTEGER, allowNull: false, onDelete: "CASCADE", onUpdate: "NO ACTION"})
    userId: number

    
    @BelongsTo(() => User)
    teacher: User

}

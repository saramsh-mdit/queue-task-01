import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { BaseDateEntity } from "../utils/entity";

@Entity()
export class Templates extends BaseDateEntity {
  @PrimaryGeneratedColumn("uuid")
  _id?: string;

  @Column({ type: "text", nullable: true })
  title?: string;

  @Column({ type: "text", nullable: true })
  text?: string;
}

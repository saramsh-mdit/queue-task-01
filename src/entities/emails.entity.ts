import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { BaseDateEntity } from "../utils/entity";
import { Users } from "./users.entity";

export enum EMAIL_STATUS_ENUM {
  success = "success",
  failed = "failed",
}

@Entity()
export class Emails extends BaseDateEntity {
  @PrimaryGeneratedColumn("uuid")
  _id?: string;

  @Column({ type: "varchar", nullable: true })
  email?: string;

  @Column({ type: "varchar", nullable: true })
  status?: EMAIL_STATUS_ENUM = EMAIL_STATUS_ENUM.failed;

  @ManyToOne(() => Users, (user) => user.sendEmails)
  sender?: Users;
}

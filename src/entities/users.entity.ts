import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { BaseDateEntity } from "../utils/entity";
import { Emails } from "./emails.entity";

@Entity()
export class Users extends BaseDateEntity {
  @PrimaryGeneratedColumn("uuid")
  _id?: string;

  @Column({ type: "varchar", nullable: true })
  name?: string;

  @Column({ type: "varchar", nullable: true })
  email?: string;

  @Column({ type: "text", nullable: true })
  password?: string;

  @Column({ type: "bool", nullable: true })
  isVerified?: boolean = false;

  @OneToMany(() => Emails, (email) => email.sender)
  sendEmails?: Emails[];
}

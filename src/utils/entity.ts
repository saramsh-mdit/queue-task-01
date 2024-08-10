import { CreateDateColumn, DeleteDateColumn } from "typeorm";

export abstract class BaseDateEntity {
  @CreateDateColumn()
  createdDate?: Date;

  @DeleteDateColumn()
  deletedDate?: Date;
}

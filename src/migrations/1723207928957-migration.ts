import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1723207928957 implements MigrationInterface {
    name = 'Migration1723207928957'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE "templates" (
                "createdDate" TIMESTAMP NOT NULL DEFAULT now(),
                "deletedDate" TIMESTAMP,
                "_id" uuid NOT NULL DEFAULT uuid_generate_v4(),
                "title" text,
                "text" text,
                CONSTRAINT "PK_f0c2a6765ec69bd0b72e6d14200" PRIMARY KEY ("_id")
            )
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            DROP TABLE "templates"
        `);
    }

}

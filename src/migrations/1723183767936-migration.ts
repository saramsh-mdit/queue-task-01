import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1723183767936 implements MigrationInterface {
    name = 'Migration1723183767936'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE "emails" (
                "createdDate" TIMESTAMP NOT NULL DEFAULT now(),
                "deletedDate" TIMESTAMP,
                "_id" uuid NOT NULL DEFAULT uuid_generate_v4(),
                "email" character varying,
                "status" character varying,
                "sender_id" uuid,
                CONSTRAINT "PK_0f0dd5e821159afec841299f14c" PRIMARY KEY ("_id")
            )
        `);
        await queryRunner.query(`
            CREATE TABLE "users" (
                "createdDate" TIMESTAMP NOT NULL DEFAULT now(),
                "deletedDate" TIMESTAMP,
                "_id" uuid NOT NULL DEFAULT uuid_generate_v4(),
                "name" character varying,
                "email" character varying,
                "password" character varying,
                "isVerified" character varying,
                CONSTRAINT "PK_46c438e5a956fb9c3e86e73e321" PRIMARY KEY ("_id")
            )
        `);
        await queryRunner.query(`
            ALTER TABLE "emails"
            ADD CONSTRAINT "FK_42a0e99d1e54f0eceb328276a0b" FOREIGN KEY ("sender_id") REFERENCES "users"("_id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "emails" DROP CONSTRAINT "FK_42a0e99d1e54f0eceb328276a0b"
        `);
        await queryRunner.query(`
            DROP TABLE "users"
        `);
        await queryRunner.query(`
            DROP TABLE "emails"
        `);
    }

}

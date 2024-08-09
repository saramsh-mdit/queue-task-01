import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1723205003975 implements MigrationInterface {
    name = 'Migration1723205003975'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "users" DROP COLUMN "password"
        `);
        await queryRunner.query(`
            ALTER TABLE "users"
            ADD "password" text
        `);
        await queryRunner.query(`
            ALTER TABLE "users" DROP COLUMN "isVerified"
        `);
        await queryRunner.query(`
            ALTER TABLE "users"
            ADD "isVerified" boolean
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "users" DROP COLUMN "isVerified"
        `);
        await queryRunner.query(`
            ALTER TABLE "users"
            ADD "isVerified" character varying
        `);
        await queryRunner.query(`
            ALTER TABLE "users" DROP COLUMN "password"
        `);
        await queryRunner.query(`
            ALTER TABLE "users"
            ADD "password" character varying
        `);
    }

}

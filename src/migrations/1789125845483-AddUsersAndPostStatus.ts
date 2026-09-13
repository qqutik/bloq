import { MigrationInterface, QueryRunner } from "typeorm";

export class AddUsersAndPostStatus1789125845483 implements MigrationInterface {
    name = 'AddUsersAndPostStatus1789125845483'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`users\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, \`email\` varchar(255) NOT NULL, \`bio\` text NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), UNIQUE INDEX \`IDX_97672ac88f789774dd47f7c8be\` (\`email\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`posts\` DROP COLUMN \`author\``);
        await queryRunner.query(`ALTER TABLE \`posts\` ADD \`status\` enum ('published', 'pending', 'draft', 'archived') NOT NULL DEFAULT 'draft'`);
        await queryRunner.query(`ALTER TABLE \`posts\` ADD \`user_id\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`posts\` ADD CONSTRAINT \`FK_c4f9a7bd77b489e711277ee5986\` FOREIGN KEY (\`user_id\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`posts\` DROP FOREIGN KEY \`FK_c4f9a7bd77b489e711277ee5986\``);
        await queryRunner.query(`ALTER TABLE \`posts\` DROP COLUMN \`user_id\``);
        await queryRunner.query(`ALTER TABLE \`posts\` DROP COLUMN \`status\``);
        await queryRunner.query(`ALTER TABLE \`posts\` ADD \`author\` varchar(255) NOT NULL`);
        await queryRunner.query(`DROP INDEX \`IDX_97672ac88f789774dd47f7c8be\` ON \`users\``);
        await queryRunner.query(`DROP TABLE \`users\``);
    }

}

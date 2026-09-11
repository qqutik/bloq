import { MigrationInterface, QueryRunner } from "typeorm";

export class InitPosts1789114849980 implements MigrationInterface {
    name = 'InitPosts1789114849980'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`posts\` (\`id\` int NOT NULL AUTO_INCREMENT, \`alias\` varchar(255) NOT NULL, \`title\` varchar(255) NOT NULL, \`text\` text NOT NULL, \`author\` varchar(255) NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), UNIQUE INDEX \`IDX_16cb059095a99c9d589502a0dc\` (\`alias\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX \`IDX_16cb059095a99c9d589502a0dc\` ON \`posts\``);
        await queryRunner.query(`DROP TABLE \`posts\``);
    }

}

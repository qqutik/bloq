import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddUsersPassword1789289333093 implements MigrationInterface {
  name = 'AddUsersPassword1789289333093';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`users\` ADD \`password\` varchar(255) NOT NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE \`users\` DROP COLUMN \`password\``);
  }
}

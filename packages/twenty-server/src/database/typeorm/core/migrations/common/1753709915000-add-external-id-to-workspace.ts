import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddExternalIdToWorkspace1753709915000 implements MigrationInterface {
  name = 'AddExternalIdToWorkspace1753709915000';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "core"."workspace" ADD "externalId" varchar UNIQUE NULL`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "core"."workspace" DROP COLUMN "externalId"`
    );
  }
}
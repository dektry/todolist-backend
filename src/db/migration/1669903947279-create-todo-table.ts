import { MigrationInterface, QueryRunner } from 'typeorm';

export class createTodoTable1669903947279 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE todo( 
          id INT NOT NULL AUTO_INCREMENT, 
          content VARCHAR(255) NOT NULL, 
          created TIMESTAMP NOT NULL DEFAULT now(), 
          updated TIMESTAMP NOT NULL DEFAULT now(), 
          isCompleted BOOLEAN NOT NULL DEFAULT false, 
          PRIMARY KEY (id));`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "todo"`);
  }
}

import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-sqlite'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.run(sql`ALTER TABLE \`pages_blocks_home_services_services\` ADD \`action_title\` text DEFAULT 'Explore' NOT NULL;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_home_services_services\` ADD \`action_variant\` text DEFAULT 'tertiary' NOT NULL;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_home_services_services\` ADD \`action_url\` text;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_home_services_services\` ADD \`action_new_tab\` integer DEFAULT false;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_home_services_services\` ADD \`action_custom_icon_id\` integer REFERENCES media(id);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_home_services_services_action_action_custom_idx\` ON \`pages_blocks_home_services_services\` (\`action_custom_icon_id\`);`)
  await db.run(sql`ALTER TABLE \`pages_blocks_home_services_services\` DROP COLUMN \`action_label\`;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_home_services_services\` DROP COLUMN \`href\`;`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.run(sql`PRAGMA foreign_keys=OFF;`)
  await db.run(sql`CREATE TABLE \`__new_pages_blocks_home_services_services\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`title\` text NOT NULL,
  	\`description\` text NOT NULL,
  	\`action_label\` text DEFAULT 'Explore',
  	\`href\` text,
  	\`image_id\` integer,
  	FOREIGN KEY (\`image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages_blocks_home_services\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`INSERT INTO \`__new_pages_blocks_home_services_services\`("_order", "_parent_id", "id", "title", "description", "action_label", "href", "image_id") SELECT "_order", "_parent_id", "id", "title", "description", "action_label", "href", "image_id" FROM \`pages_blocks_home_services_services\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_home_services_services\`;`)
  await db.run(sql`ALTER TABLE \`__new_pages_blocks_home_services_services\` RENAME TO \`pages_blocks_home_services_services\`;`)
  await db.run(sql`PRAGMA foreign_keys=ON;`)
  await db.run(sql`CREATE INDEX \`pages_blocks_home_services_services_order_idx\` ON \`pages_blocks_home_services_services\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_home_services_services_parent_id_idx\` ON \`pages_blocks_home_services_services\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_home_services_services_image_idx\` ON \`pages_blocks_home_services_services\` (\`image_id\`);`)
}

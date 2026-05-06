CREATE TABLE `certifications` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text NOT NULL,
	`issuer` text NOT NULL,
	`date` text NOT NULL,
	`url` text,
	`img` text,
	`type` text DEFAULT 'major' NOT NULL
);
--> statement-breakpoint
CREATE TABLE `posts` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`title` text NOT NULL,
	`slug` text NOT NULL,
	`excerpt` text NOT NULL,
	`content` text NOT NULL,
	`cover` text NOT NULL,
	`date` text NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `posts_slug_unique` ON `posts` (`slug`);--> statement-breakpoint
CREATE TABLE `profile` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text NOT NULL,
	`surname` text NOT NULL,
	`role` text NOT NULL,
	`photo` text NOT NULL,
	`github` text NOT NULL,
	`linkedin` text NOT NULL,
	`email` text NOT NULL,
	`resume` text NOT NULL
);
--> statement-breakpoint
ALTER TABLE `experiences` ADD `category` text NOT NULL;--> statement-breakpoint
ALTER TABLE `experiences` ADD `img` text NOT NULL;--> statement-breakpoint
ALTER TABLE `experiences` ADD `doc` text;--> statement-breakpoint
ALTER TABLE `projects` ADD `type` text DEFAULT 'major' NOT NULL;--> statement-breakpoint
ALTER TABLE `projects` ADD `challenge` text;--> statement-breakpoint
ALTER TABLE `projects` ADD `solution` text;--> statement-breakpoint
ALTER TABLE `projects` ADD `impact` text;--> statement-breakpoint
ALTER TABLE `skills` ADD `level` integer DEFAULT 80 NOT NULL;
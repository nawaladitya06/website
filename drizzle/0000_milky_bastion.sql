CREATE TABLE IF NOT EXISTS `educations` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`institution` text NOT NULL,
	`degree` text NOT NULL,
	`year` text NOT NULL,
	`score` text NOT NULL,
	`link` text NOT NULL
);
--> statement-breakpoint
CREATE TABLE `experiences` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`role` text NOT NULL,
	`org` text NOT NULL,
	`year` text NOT NULL,
	`desc` text NOT NULL
);
--> statement-breakpoint
CREATE TABLE `messages` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text NOT NULL,
	`email` text NOT NULL,
	`message` text NOT NULL,
	`created_at` integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE `projects` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`title` text NOT NULL,
	`desc` text NOT NULL,
	`tech` text NOT NULL,
	`year` text NOT NULL,
	`size` text NOT NULL,
	`img` text NOT NULL,
	`github` text,
	`demo` text
);

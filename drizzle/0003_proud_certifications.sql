CREATE TABLE IF NOT EXISTS `certifications` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text NOT NULL,
	`issuer` text NOT NULL,
	`date` text NOT NULL,
	`url` text,
	`img` text
);

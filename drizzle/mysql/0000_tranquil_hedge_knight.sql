CREATE TABLE `users` (
	`id` char(36) NOT NULL,
	`email` varchar(255) NOT NULL,
	`password` char(60) NOT NULL,
	`created_at` datetime(6) NOT NULL,
	CONSTRAINT `users_id` PRIMARY KEY(`id`)
);

CREATE TABLE `user` (
  `id` int NOT NULL auto_increment,
  `name` varchar(100) NOT NULL,
  `username` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(100) NOT NULL,
  `phone` varchar(100) NOT NULL,
  `address` varchar(100) NOT NULL,
  PRIMARY KEY(id),
  UNIQUE KEY username_unique(username),
  UNIQUE KEY email_unique(email)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
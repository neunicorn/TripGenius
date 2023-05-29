CREATE TABLE `user` (
  `id` int NOT NULL auto_increment,
  `name` varchar(100) NOT NULL,
  `age` varchar(100),
  `username` varchar(100),
  `email` varchar(100) NOT NULL,
  `password` varchar(100) NOT NULL,
  `phone` varchar(100),
  `hometown` varchar(100),
  `address` varchar(100),
  PRIMARY KEY(id),
  UNIQUE KEY username_unique(username),
  UNIQUE KEY email_unique(email)
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_general_ci;
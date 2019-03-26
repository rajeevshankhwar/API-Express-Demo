CREATE TABLE `authors` (
  `author_ID` int(10) PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `json` json NOT NULL,
  `author_name`  varchar(255) GENERATED ALWAYS AS (json_unquote(json_extract(`json`,'$.author_name'))) STORED,
  `author_avatar` varchar(255) GENERATED ALWAYS AS (json_unquote(json_extract(`json`,'$.author_avatar'))) STORED,
  `author_description` varchar(255) GENERATED ALWAYS AS (json_unquote(json_extract(`json`,'$.author_description'))) STORED
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

CREATE TABLE `posts` (
  `post_ID` int(10) PRIMARY KEY NOT NULL AUTO_INCREMENT,
   `json` json NOT NULL,
  `time` DATE NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `post_content` varchar(255) GENERATED ALWAYS AS (json_unquote(json_extract(`json`,'$.post_content'))) STORED,
  `post_status` varchar(20) GENERATED ALWAYS AS (json_unquote(json_extract(`json`,'$.post_status'))) STORED,
  `post_type` varchar(10) GENERATED ALWAYS AS (json_unquote(json_extract(`json`,'$.post_type'))) STORED,
  `article_title` varchar(10) GENERATED ALWAYS AS (json_unquote(json_extract(`json`,'$.article_title'))) STORED,
  `article_content`varchar(10) GENERATED ALWAYS AS (json_unquote(json_extract(`json`,'$.article_content'))) STORED
)ENGINE=InnoDB DEFAULT CHARSET=latin1;

CREATE TABLE `appointment` (
  `ID` int(10) PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `json` json NOT NULL,
  `userId`  int(10) GENERATED ALWAYS AS (json_unquote(json_extract(`json`,'$.userId'))) STORED,
   `date` DATE GENERATED ALWAYS AS (json_unquote(json_extract(`json`,'$.date'))) STORED,
  `name`  varchar(255) GENERATED ALWAYS AS (json_unquote(json_extract(`json`,'$.name'))) STORED,
  `address` varchar(255) GENERATED ALWAYS AS (json_unquote(json_extract(`json`,'$.address'))) STORED,
  `email` varchar(255) GENERATED ALWAYS AS (json_unquote(json_extract(`json`,'$.email'))) STORED,
  `phonenumber` varchar(255) GENERATED ALWAYS AS (json_unquote(json_extract(`json`,'$.phonenumber'))) STORED
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

CREATE TABLE `appointment` (
  `ID` int(10) PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `json` json NOT NULL,
  `userId`  int(10) GENERATED ALWAYS AS (json_unquote(json_extract(`json`,'$.userId'))) STORED,
   `date` DATE GENERATED ALWAYS AS (json_unquote(json_extract(`json`,'$.date'))) STORED
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
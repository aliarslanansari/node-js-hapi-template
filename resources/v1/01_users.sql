CREATE TABLE users 
  ( 
     id              INT NOT NULL AUTO_INCREMENT PRIMARY KEY, 
     name            VARCHAR (32) NOT NULL, 
     email           VARCHAR(32) NOT NULL UNIQUE, 
     phone_no         BIGINT(12) NOT NULL UNIQUE,
     country         VARCHAR(12) NOT NULL,
     gender          VARCHAR(6) NOT NULL,
     dob             DATETIME NOT NULL,
     updated_at      DATETIME NULL on UPDATE CURRENT_TIMESTAMP,
     created_at      DATETIME DEFAULT CURRENT_TIMESTAMP NOT NULL
  );
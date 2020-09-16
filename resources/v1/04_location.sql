CREATE TABLE location 
  ( 
     id              INT NOT NULL AUTO_INCREMENT PRIMARY KEY, 
     latitude      FLOAT (32) NOT NULL, 
     longitude      FLOAT (32) NOT NULL, 
     landmark_name   VARCHAR (32) NOT NULL,
     zip_code        INT(6) NOT NULL,
     created_at      DATETIME DEFAULT CURRENT_TIMESTAMP NOT NULL,
     updated_at      DATETIME NULL on UPDATE CURRENT_TIMESTAMP
  );
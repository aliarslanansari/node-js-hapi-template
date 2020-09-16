CREATE TABLE cab 
  ( 
     id              INT NOT NULL AUTO_INCREMENT PRIMARY KEY, 
     reg_no          VARCHAR (32) NOT NULL UNIQUE, 
     brand       VARCHAR(32) NOT NULL, 
     model       VARCHAR(32) NOT NULL, 
     cab_type       VARCHAR(32) NOT NULL,  /*mini, prime, suv, lux*/
     base_rate      FLOAT NOT NULL,
     latitude      FLOAT (32) NOT NULL, 
     longitude      FLOAT (32) NOT NULL,
     created_at      DATETIME DEFAULT CURRENT_TIMESTAMP NOT NULL,
     updated_at      DATETIME NULL on UPDATE CURRENT_TIMESTAMP
  );
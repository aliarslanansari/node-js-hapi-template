CREATE TABLE drivers
  ( 
     id              INT AUTO_INCREMENT PRIMARY KEY, 
     oauth_client_id INT(11) NOT NULL,
     name           VARCHAR (32) NOT NULL, 
     current_cab_id INT NOT NULL UNIQUE,
     created_at      DATETIME DEFAULT CURRENT_TIMESTAMP NOT NULL,
     updated_at      DATETIME NULL on UPDATE CURRENT_TIMESTAMP,
     CONSTRAINT cab_id_check FOREIGN KEY (current_cab_id) 
     REFERENCES cabs (id) ON UPDATE CASCADE
  );
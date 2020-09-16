CREATE TABLE trip 
  ( 
     id              INT NOT NULL AUTO_INCREMENT PRIMARY KEY, 
     rider_id      INT NOT NULL, 
     driver_id       INT NOT NULL, 
     cab_id           INT NOT NULL, 
     start_loc_id         INT NOT NULL,
     end_loc_id         INT NOT NULL,    
     trip_start_time DATETIME NOT NULL,
     trip_end_time DATETIME NOT NULL,
     created_at      DATETIME DEFAULT CURRENT_TIMESTAMP NOT NULL,
     updated_at      DATETIME NULL on UPDATE CURRENT_TIMESTAMP,
     CONSTRAINT cab_id_ck FOREIGN KEY (cab_id) REFERENCES cab (id) ON UPDATE CASCADE,
     CONSTRAINT driver_id_check FOREIGN KEY (driver_id) REFERENCES drivers (id) ON UPDATE CASCADE,
     CONSTRAINT rider_id_check FOREIGN KEY (rider_id) REFERENCES users (id) ON UPDATE CASCADE,
     CONSTRAINT start_loc_id_check FOREIGN KEY (start_loc_id) REFERENCES location (id) ON UPDATE CASCADE,
     CONSTRAINT end_loc_id_check FOREIGN KEY (end_loc_id) REFERENCES location (id) ON UPDATE CASCADE
  );
CREATE USER 'inknest'@'localhost' IDENTIFIED BY 'letsrock'; 
CREATE DATABASE `inknestdb`;
GRANT ALL ON *.* TO 'inknest'@'localhost';
FLUSH PRIVILEGES;

CREATE TABLE `ink_user` (
  `User_UID` VARCHAR(225),
  `Email` VARCHAR(225),
  `Password` VARCHAR(225),
  `First_Name` VARCHAR(225),
  `Last_Name` VARCHAR(225),
  `Account_Type` VARCHAR(225),
  `Inkshelf_UID` VARCHAR(225),
  `Validated` BOOLEAN,
  `Totoal_files` INT(20),
  PRIMARY KEY (`User_UID`)
);

CREATE TABLE `Shared_Shelf` (
  `Shared_Shelf_UID` VARCHAR(225),
  `Shelf_UID` VARCHAR(225),
  `Shared_With_UID` VARCHAR(225),
  `Shared_By_UID` VARCHAR(225),
  `Shared_Date` VARCHAR(225),
  `Shelf_Name` VARCHAR(225),
  `Shared_By` VARCHAR(225),
  PRIMARY KEY (`Shared_Shelf_UID`),
  FOREIGN KEY (`Shared_With_UID`) REFERENCES `ink_user`(`User_UID`),
  FOREIGN KEY (`Shelf_UID`) REFERENCES `Shelf`(`Shelf_UID`)
);

CREATE TABLE `Shelf` (
  `Shelf_UID` VARCHAR(225),
  `Shelf_Name` VARCHAR(225),
  `Shelf_Owner_UID` VARCHAR(225),
  `Is_Open` BOOLEAN,
  `Shelf_Created_Date` VARCHAR(225),
  `Shelf_Description` VARCHAR(225),
  PRIMARY KEY (`Shelf_UID`),
  FOREIGN KEY (`Shelf_Owner_UID`) REFERENCES `ink_user`(`User_UID`)
);

CREATE TABLE `Suggestion` (
  `Suggestion_UID` VARCHAR(225),
  `Suggestion_for` VARCHAR(225),
  `Book_Name` VARCHAR(225),
  `Book_Description` VARCHAR(225),
  `Download_URL` VARCHAR(225),
  PRIMARY KEY (`Suggestion_UID`),
  FOREIGN KEY (`Suggestion_for`) REFERENCES `Shelf`(`Shelf_UID`)
);

CREATE TABLE `File` (
  `File_UID` VARCHAR(225),
  `Shelf_UID` VARCHAR(225),
  `File_Name` VARCHAR(225),
  `Original_Name` VARCHAR(225),
  `Destination` VARCHAR(225),
  `Path` VARCHAR(225),
  `File_Size` INT(20),
  `Mimetype` VARCHAR(225),
  `Thumbnail_Path` VARCHAR(225),
  `File_Created_Date` varchar(255),
  PRIMARY KEY (`File_UID`),
  FOREIGN KEY (`Shelf_UID`) REFERENCES `Shelf`(`Shelf_UID`)
);

CREATE TABLE `Comment` (
  `Comment_UID` VARCHAR(225),
  `Comment_By` VARCHAR(225),
  `Comment_For` VARCHAR(225),
  PRIMARY KEY (`Comment_UID`),
  FOREIGN KEY (`Comment_By`) REFERENCES `ink_user`(`User_UID`),
  FOREIGN KEY (`Comment_For`) REFERENCES `File`(`File_UID`)
);


-- Admin operations
SELECT * FROM ink_user;
delete from ink_user; -- DANGER

SELECT * FROM shelf;
select * from shelf where Shelf_Owner_UID="11b211fd-a2e6-47ae-a845-338383884647";
delete from shelf; -- DANGER

SELECT * FROM file;
select * from file where Shelf_UID="e7c131ef-6e49-4e1a-bf84-eab3b05cf52f";
ALTER TABLE file ADD File_Created_Date varchar(255);
delete from file; -- DANGER

select * from Shared_Shelf;
delete from Shared_Shelf; -- DANGER

ALTER TABLE Shared_Shelf ADD Shelf_Name varchar(255);
ALTER TABLE Shared_Shelf ADD Shared_By varchar(255);
ALTER TABLE Shared_Shelf ADD Shared_With varchar(255);
ALTER TABLE Shared_Shelf ADD Shared_By_UID varchar(255);








CREATE TABLE profile (
  id INTEGER PRIMARY KEY AUTOINCREMENT, 
  name TEXT NOT NULL, 
  surname TEXT NOT NULL, 
  role TEXT NOT NULL, 
  photo TEXT NOT NULL, 
  github TEXT NOT NULL, 
  linkedin TEXT NOT NULL, 
  email TEXT NOT NULL, 
  resume TEXT NOT NULL
);

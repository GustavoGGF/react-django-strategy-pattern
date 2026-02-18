CREATE TABLE IF NOT EXISTS contacts (
	id serial PRIMARY KEY,
	name VARCHAR ( 200 ) NOT NULL,
	cell_phone VARCHAR ( 20 ) NOT NULL,
	email VARCHAR ( 100 ) NULL
);  

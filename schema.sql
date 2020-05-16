DROP TABLE IF EXISTS flight;

CREATE TABLE flight (
	id SERIAL PRIMARY KEY,
    airlines VARCHAR(20),
    flightnumber VARCHAR(20),
    departure VARCHAR(20),
    arrival VARCHAR(20),
	is_deleted INT DEFAULT 0,
	created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


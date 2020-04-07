DROP TABLE IF EXISTS location;
CREATE TABLE location(
    id SERIAL PRIMARY KEY,
    search_query VARCHAR(255),
    formatted_query VARCHAR(255),
    latitude json,
    longitude json
);
-- INSERT INTO citys (search_query, formatted_query, latitude, longitude ) VALUES ('hi', 'amman', );


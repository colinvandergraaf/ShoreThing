
CREATE TABLE Users (
  user_id SERIAL PRIMARY KEY,
  username VARCHAR UNIQUE NOT NULL,
  user_pw VARCHAR NOT NULL,
  home_zip INT NOT NULL,
  photo_url VARCHAR
);

CREATE TABLE Interested (
  int_id SERIAL PRIMARY KEY,
  user_id INT NOT NULL,
  trail_id INT NOT NULL
);

CREATE TABLE Visited (
  vis_id SERIAL PRIMARY KEY,
  user_id INT NOT NULL,
  trail_id INT NOT NULL,
  visits INT DEFAULT 0
);
DROP TABLE IF EXISTS property;
DROP TABLE IF EXISTS rate;
DROP TABLE IF EXISTS location;
DROP TABLE IF EXISTS image;
DROP TABLE IF EXISTS amenities;

CREATE TABLE property
(
    id                 varchar(36)  NOT NULL PRIMARY KEY,
    type               varchar(50)  NOT NULL,
    name               varchar(50)  NOT NULL,
    owner              varchar(50)  NOT NULL,
    description        varchar(255) NOT NULL,
    beds               int          NOT NULL,
    baths              int          NOT NULL,
    square_feet        int          NOT NULL,
    create_date        datetime(6),
    last_modified_date datetime(6)
) ENGINE = InnoDB;

CREATE TABLE rate
(
    id          varchar(36) NOT NULL PRIMARY KEY,
    property_id varchar(36),
    monthly     int         NOT NULL,
    weekly      int         NOT NULL,
    nightly     int         NOT NULL,
    CONSTRAINT fk_property_id_rate FOREIGN KEY (property_id) REFERENCES property(id) ON DELETE CASCADE
) ENGINE = InnoDB;

CREATE TABLE location
(
    id          varchar(36)  NOT NULL PRIMARY KEY,
    property_id varchar(36),
    city        varchar(100) NOT NULL,
    street      varchar(100) NOT NULL,
    state       varchar(100) NOT NULL,
    zipcode     varchar(100) NOT NULL,
    CONSTRAINT fk_property_id_location FOREIGN KEY (property_id) REFERENCES property(id) ON DELETE CASCADE
) ENGINE = InnoDB;

CREATE TABLE image
(
    id          varchar(36) NOT NULL PRIMARY KEY,
    property_id varchar(36),
    url         text        NOT NULL,
    CONSTRAINT fk_property_id_image FOREIGN KEY (property_id) REFERENCES property(id) ON DELETE CASCADE
) ENGINE = InnoDB;

CREATE TABLE amenities
(
    id          varchar(36) NOT NULL PRIMARY KEY,
    property_id varchar(36),
    name        varchar(50) NOT NULL,
    CONSTRAINT fk_property_id_amenities FOREIGN KEY (property_id) REFERENCES property(id) ON DELETE CASCADE
) ENGINE = InnoDB;
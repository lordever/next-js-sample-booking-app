drop table if exists property;
drop table if exists rate;
drop table if exists location;
drop table if exists image;
drop table if exists amenities;

create table property
(
    id                 varchar(36)  not null,
    type               varchar(50)  not null,
    name               varchar(50)  not null,
    owner              varchar(50)  not null,
    description        varchar(255) not null,
    beds               int          not null,
    baths              int          not null,
    square_feet        int          not null,
    create_date        datetime(6),
    last_modified_date datetime(6),
    primary key (id)
) engine = InnoDB;

create table rate
(
    id          varchar(36) not null PRIMARY KEY,
    property_id varchar(36) not null UNIQUE,
    monthly     int         not null,
    weekly      int         not null,
    nightly     int         not null,
    CONSTRAINT rate_fk FOREIGN KEY (property_id) REFERENCES property (id)
) engine = InnoDB;

create table location
(
    id          varchar(36)  not null PRIMARY KEY,
    property_id varchar(36)  not null UNIQUE,
    city        varchar(100) not null,
    street      varchar(100) not null,
    state       varchar(100) not null,
    zipcode     varchar(100) not null,
    CONSTRAINT location_fk FOREIGN KEY (property_id) REFERENCES property (id)
) engine = InnoDB;

create table image
(
    id          varchar(36) not null PRIMARY KEY,
    property_id varchar(36) not null UNIQUE,
    url         text        not null,
    CONSTRAINT image_fk FOREIGN KEY (property_id) REFERENCES property (id)
) engine = InnoDB;

create table amenities
(
    id          varchar(36) not null PRIMARY KEY,
    property_id varchar(36) not null UNIQUE,
    name        varchar(50) not null,
    CONSTRAINT amenities_fk FOREIGN KEY (property_id) REFERENCES property (id)
) engine = InnoDB;

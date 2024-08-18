alter table location
drop column full_text;

alter table location
add column full_address varchar(255);
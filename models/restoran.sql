create table if not exists restoran (
  id int primary key auto_increment,
  name varchar(255) not null,
  address varchar(255) not null,
  phone varchar(20) not null
);

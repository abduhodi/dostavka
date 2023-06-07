create table if not exists customer(
  id int primary key auto_increment,
  name varchar(255) not null,
  phone varchar(20) not null,
  address varchar(255) not null
)
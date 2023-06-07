create table if not exists orders(
  id int primary key auto_increment,
  customer_id int not null,
  menu_id int not null,
  shipping_id int not null,
  quantity int not null,
  order_time timestamp default current_timestamp
);
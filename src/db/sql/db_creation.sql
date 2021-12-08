CREATE DATABASE online_shope
    WITH 
    OWNER = postgres
    ENCODING = 'UTF8'
    CONNECTION LIMIT = -1;


CREATE TABLE public.Products (
	id serial PRIMARY KEY,
	name VARCHAR ( 50 ) UNIQUE NOT NULL,
	type VARCHAR ( 50 ),
	subtype VARCHAR ( 50 ),
	price float8,
	quantityInStock int,
	totalQuantitySold int,
	manufacturer varchar (50)
);

create table public.Customer(
	id serial PRIMARY KEY,
	name varchar (50) not null,
	surname varchar (50) not null,
	location varchar (100),
	contact varchar(20)
);

create table public.Orders(
	id serial PRIMARY KEY,
	customerId int,
	detailId int,
	orderedProducts integer[],
	totalPrice float8,
	foreign key (customerId) references Customer(id),
	foreign key (detailId) references OrderDetails(id)
);


create table public.OrderDetails(
	detailId serial PRIMARY KEY,
	orderDate timestamp,
	shipmentDate timestamp null,
	shipmentStatus varchar(50),
	foreign key (orderId) references Orders(id)
);

create table public.Delivery(
	id serial PRIMARY KEY,
	orderId int,
	city varchar(50),
	postCode varchar(10),
	street varchar(50),
	houseNumber varchar(10),
	foreign key (orderId) references Orders(id)
);

INSERT INTO "Products" (name, type, subtype, price, "quantityInStock", "totalQuantitySold", manufacturer)
VALUES ('BMW', 'x3', 'Sedan', 40000 , 20, 2, 'Deutschland'),
       ('Audi', 'A6', 'Sedan', 60000,30, 8, 'Deutschland'),
       ('Volkswagen', 'Polo', 'Compact', 25000 ,50, 15, 'Deutschland'),
	   ('Alfa Romeo', 'Giulia', 'Sedan', 70000 ,20, 3, 'Italy'),
	   ('Lada', 'VAZ-2101', 'Sedan', 10000 , 20, 1, 'Russia'),
	   ('Peugeot', '306', 'Compact', 20000 ,70, 15, 'France'),
	   ('Toyota', 'Camry 3.5', 'Sedan', 75000, 70, 35, 'Japan'),
	   ('Toyota', 'Mark 2', 'Sedan',  25000 ,20, 7, 'Japan'),
       ('Mazda', '6', 'Kombi', 50000, 45, 12, 'Japan');


INSERT INTO "Customer" (name, surname, location, contact)
VALUES ('Test1', 'Test1', 'Test_location', '57324234'),
       ('Test2', 'Test3', 'Test_location2', '27324234'),
       ('Test2', 'Test3', 'Test_location2', '77324234');


INSERT INTO "OrderDetails" ("orderDate", "shipmentDate","shipmentStatus")
VALUES ('2021-12-6 19:10:25-07', '2022-01-6 19:10:25-07','Preparation'),
       ('2021-11-6 19:10:25-07', '2022-12-6 19:10:25-07','Delivered'),
       ('2021-12-9 19:10:25-07', '2022-01-31 19:10:25-07','On the way');


INSERT INTO "Orders" ("customerId", "orderedProducts", "totalPrice")
VALUES (1, '{1,2}', 11000),
       (2, '{7,8,4}', 170000),
       (3, '{5,5}', 20000);


INSERT INTO "Delivery" ("orderId", city, "postCode",street,"houseNumber")
VALUES (1, 'Rome', '12103','Kaiserin-Augusta-Straße',7),
       (2, 'Rome', '00182','Via Noto',35),
       (3, 'Moscow', '115280','ул. Архитектора Щусева',12);

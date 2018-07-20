DROP DATABASE IF EXISTS bamazon_DB;
CREATE DATABASE bamazon_DB;

USE bamazon_DB;

CREATE TABLE products(
  item_id INT NOT NULL AUTO_INCREMENT,
  product_name VARCHAR(100) NOT NULL,
  department_name VARCHAR(45) NOT NULL,
  price DECIMAL(10,2) default 0,
  stock_quantity INT default 0,
  PRIMARY KEY (item_id)
);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Soccer Ball", "Sporting Goods", 10.00, 16);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Golf Balls", "Sporting Goods", 25.00, 26);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Basketball", "Sporting Goods", 15.00, 36);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Baseball", "Sporting Goods", 5.00, 46);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Football", "Sporting Goods", 13.00, 56);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Tennis Balls", "Sporting Goods", 8.00, 66);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Raquet Balls", "Sporting Goods", 6.00, 76);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Bocce Balls", "Sporting Goods", 100.00, 16);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Bowling Ball", "Sporting Goods", 120.00, 6);


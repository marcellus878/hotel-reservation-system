CREATE DATABASE hotel_booking;



CREATE TABLE bookings (
    booking_id INT NOT NULL AUTO_INCREMENT,
    room_number INT,
    customer_id INT,
    check_in DATE,
    check_out DATE,
    total_price DECIMAL(10, 2),
    PRIMARY KEY (booking_id),
    FOREIGN KEY (room_number) REFERENCES rooms(room_number), -- Assuming a 'rooms' table exists
    FOREIGN KEY (customer_id) REFERENCES customers(customer_id) -- Assuming a 'customers' table exists
);




CREATE TABLE customers (
    customer_id INT NOT NULL AUTO_INCREMENT,
    first_name VARCHAR(255),
    last_name VARCHAR(255),
    email VARCHAR(255),
    phone_number VARCHAR(20),
    PRIMARY KEY (customer_id)
);



CREATE TABLE payments (
    payment_id INT NOT NULL AUTO_INCREMENT,
    booking_id INT,
    amount DECIMAL(10,2),
    payment_date DATE,
    payment_method VARCHAR(50),
    PRIMARY KEY (payment_id),
    FOREIGN KEY (booking_id) REFERENCES bookings(booking_id)
);



CREATE TABLE reservations (
    reservation_id INT NOT NULL AUTO_INCREMENT,
    room_number INT,
    customer_id INT,
    check_in DATE,
    check_out DATE,
    status VARCHAR(50),
    PRIMARY KEY (reservation_id),
    FOREIGN KEY (room_number) REFERENCES rooms(room_number),
    FOREIGN KEY (customer_id) REFERENCES customers(customer_id)
);


CREATE TABLE rooms (
    room_number INT NOT NULL,
    room_type VARCHAR(255),
    price DECIMAL(10,2),
    is_available TINYINT(1),
    check_in DATE,
    check_out DATE,
    PRIMARY KEY (room_number)
);
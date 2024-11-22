import mysql.connector
from mysql.connector import Error

class HotelBookingSystem:
    def __init__(self, host, user, password, database):
        try:
            self.connection = mysql.connector.connect(
                host=host,
                user=user,
                password=password,
                database=database
            )
            if self.connection.is_connected():
                print("Successfully connected to the database")
        except Error as e:
            print("Error while connecting to MySQL", e)

    def add_customer(self, customer_name, email, phone):
        """Adds a new customer to the customers table."""
        try:
            cursor = self.connection.cursor()
            query = "INSERT INTO customers (name, email, phone) VALUES (%s, %s, %s)"
            cursor.execute(query, (customer_name, email, phone))
            self.connection.commit()
            print("Customer added successfully.")
        except Error as e:
            print("Error adding customer:", e)

    def make_reservation(self, customer_id, room_id, check_in, check_out):
        """Creates a reservation and adds it to the reservations table."""
        try:
            cursor = self.connection.cursor()
            query = "INSERT INTO reservations (customer_id, room_id, check_in, check_out) VALUES (%s, %s, %s, %s)"
            cursor.execute(query, (customer_id, room_id, check_in, check_out))
            self.connection.commit()
            print("Reservation created successfully.")
        except Error as e:
            print("Error creating reservation:", e)

    def record_payment(self, reservation_id, amount, payment_date):
        """Records a payment for a reservation."""
        try:
            cursor = self.connection.cursor()
            query = "INSERT INTO payments (reservation_id, amount, payment_date) VALUES (%s, %s, %s)"
            cursor.execute(query, (reservation_id, amount, payment_date))
            self.connection.commit()
            print("Payment recorded successfully.")
        except Error as e:
            print("Error recording payment:", e)

    def view_all_rooms(self):
        """Fetches and displays all available rooms from the rooms table."""
        try:
            cursor = self.connection.cursor()
            query = "SELECT * FROM rooms"
            cursor.execute(query)
            rooms = cursor.fetchall()
            for room in rooms:
                print(room)
        except Error as e:
            print("Error fetching rooms:", e)

    def view_bookings(self):
        """Displays all bookings from the bookings table."""
        try:
            cursor = self.connection.cursor()
            query = "SELECT * FROM bookings"
            cursor.execute(query)
            bookings = cursor.fetchall()
            for booking in bookings:
                print(booking)
        except Error as e:
            print("Error fetching bookings:", e)

    def close_connection(self):
        """Closes the connection to the MySQL database."""
        if self.connection.is_connected():
            self.connection.close()
            print("Database connection closed.")

# Example usage
def main():
    # Update with your own database credentials
    system = HotelBookingSystem(host="localhost", user="root", password="Janet_88", database="hotel_booking")

    # Sample operations
    

    print("\nAll Rooms:")
    system.view_all_rooms()

    print("\nAll Bookings:")
    system.view_bookings()

    system.close_connection()

if __name__ == "__main__":
    main()

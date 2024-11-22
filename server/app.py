from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from datetime import datetime
from flask_cors import CORS

app = Flask(__name__)

CORS(app)

# Configure SQLite database
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///hotel_bookings.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)

# Define Models
class Booking(db.Model):
    __tablename__ = 'bookings'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    email = db.Column(db.String(100), nullable=False)
    room_type = db.Column(db.String(50), nullable=False)
    checkin_date = db.Column(db.Date, nullable=False)
    checkout_date = db.Column(db.Date, nullable=False)
    stay_duration = db.Column(db.Integer, nullable=False)
    total_price = db.Column(db.Float, nullable=False)

    def to_dict(self):
        """Convert model instance to dictionary."""
        return {
            "id": self.id,
            "name": self.name,
            "email": self.email,
            "room_type": self.room_type,
            "checkin_date": self.checkin_date.strftime("%Y-%m-%d"),
            "checkout_date": self.checkout_date.strftime("%Y-%m-%d"),
            "stay_duration": self.stay_duration,
            "total_price": self.total_price
        }

# Initialize the database
@app.before_request
def create_tables():
    db.create_all()

# Room Prices
room_prices = {
    'suite': 32000,
    'sea-facing': 15000,
    'chalet': 10000,
    'presidential': 55000,
    'deluxe': 23000
}

# API Endpoints
@app.route('/api/rooms', methods=['GET'])
def get_rooms():
    """Get a list of available room types with prices."""
    return jsonify({"available_rooms": room_prices})

@app.route('/api/book', methods=['POST'])
def book_room():
    """Book a room."""
    data = request.json
    try:
        # Get user details
        name = data.get("name")
        email = data.get("email")
        room_type = data.get("room_type").lower()
        checkin_date = datetime.strptime(data.get("checkin_date"), "%Y-%m-%d")
        checkout_date = datetime.strptime(data.get("checkout_date"), "%Y-%m-%d")

        # Validate inputs
        if room_type not in room_prices:
            return jsonify({"error": "Invalid room type. Please select a valid room type."}), 400

        if checkin_date >= checkout_date:
            return jsonify({"error": "Check-out date must be after check-in date."}), 400

        # Calculate stay duration
        stay_duration = (checkout_date - checkin_date).days
        if stay_duration <= 0:
            return jsonify({"error": "Stay duration must be at least 1 day."}), 400

        # Calculate total price
        price_per_night = room_prices[room_type]
        total_price = price_per_night * stay_duration

        # Save booking to the database
        booking = Booking(
            name=name,
            email=email,
            room_type=room_type.capitalize(),
            checkin_date=checkin_date,
            checkout_date=checkout_date,
            stay_duration=stay_duration,
            total_price=total_price
        )
        db.session.add(booking)
        db.session.commit()

        # Create booking summary
        return jsonify({
            "message": "Booking successful!",
            "booking_summary": booking.to_dict()
        }), 200

    except ValueError as e:
        return jsonify({"error": str(e)}), 400
    except Exception as e:
        return jsonify({"error": "An error occurred during booking.", "details": str(e)}), 500

@app.route('/api/bookings', methods=['GET'])
def get_bookings():
    """Get all bookings from the database."""
    try:
        bookings = Booking.query.all()
        return jsonify({"bookings": [booking.to_dict() for booking in bookings]}), 200
    except Exception as e:
        return jsonify({"error": "Could not fetch bookings.", "details": str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)

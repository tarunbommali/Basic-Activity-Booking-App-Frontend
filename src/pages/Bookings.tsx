import { useEffect, useState } from "react";
import axios from "axios";
import { BACKEND_URL } from "../utils/constants";

interface Activity {
  title: string;
  description: string;
  location: string;
  time: string;
  date: string;
}

interface Booking {
  _id: string;
  noOfTickets: number;
  activity: Activity;
}

const Bookings = () => {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await axios.get(`${BACKEND_URL}/bookings`, {
          withCredentials: true,
        });
        setBookings(response.data.bookings);
      } catch (err) {
        console.error(err);
        setError("Failed to load bookings");
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, []);

  if (loading) return <p className="p-4">Loading...</p>;
  if (error) return <p className="p-4 text-red-500">{error}</p>;

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Your Bookings</h2>
      {bookings.length === 0 ? (
        <p>No bookings found.</p>
      ) : (
        <ul className="space-y-4">
          {bookings.map((booking) => (
            <li key={booking._id} className="border p-4 rounded shadow">
              <h3 className="text-lg font-semibold">{booking.activity.title}</h3>
              <p>{booking.activity.description}</p>
              <p>
                📍 {booking.activity.location} | 🕒 {booking.activity.time} | 📅{" "}
                {new Date(booking.activity.date).toLocaleDateString()}
              </p>
              <p className="mt-2 font-semibold text-green-600">
                🎟️ Tickets Booked: {booking.noOfTickets}
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Bookings;

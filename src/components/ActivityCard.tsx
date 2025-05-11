/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";
import { useState } from "react";
import { BACKEND_URL } from "../utils/constants";

interface Activity {
  _id: string;
  title: string;
  description: string;
  location: string;
  time: string;
  date: string;
}

const ActivityCard = ({ act }: { act: Activity }) => {
  const [tickets, setTickets] = useState(1);
  const [msg, setMsg] = useState("");

  const handleBooking = async () => {
    try {
      setMsg("Booking successful!");
    } catch (error: any) {
      setMsg(error?.response?.data?.message || "Booking failed");
    }
  };

  return (
    <li key={act._id} className="border p-4 rounded shadow">
      <div className="flex flex-col gap-2">
        <h3 className="text-lg font-semibold">{act.title}</h3>
        <p>{act.description}</p>
        <p>
          📍 {act.location} | 🕒 {act.time} | 📅{" "}
          {new Date(act.date).toLocaleDateString()}
        </p>

        <div className="flex items-center gap-2">
          <label htmlFor="tickets">🎟️ Tickets:</label>
          <input
            id="tickets"
            type="number"
            min={1}
            max={6}
            value={tickets}
            onChange={(e) => setTickets(parseInt(e.target.value))}
            className="w-16 border rounded px-2"
          />
        </div>

        <button
          onClick={handleBooking}
          className="bg-green-600 rounded-2xl cursor-pointer text-white p-2"
        >
          Book Now
        </button>
        {msg && <p className="text-sm text-blue-500">{msg}</p>}
      </div>
    </li>
  );
};

export default ActivityCard;

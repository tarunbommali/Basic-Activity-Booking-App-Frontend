/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import axios from "axios";
import { BACKEND_URL } from "../utils/constants";
import ActivityCard from "../components/ActivityCard";

const Home = () => {
  const [activity, setActivity] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const fetchActivities = async () => {
      try {
        const response = await axios.get(`${BACKEND_URL}`, {
          withCredentials: true,
        });
        setActivity(response.data.activities); // assuming response shape
      } catch (err) {
        console.error(err);
        setError("Failed to load activities");
      } finally {
        setLoading(false);
      }
    };

    fetchActivities();
  }, []);

  if (loading) return <div className="p-4">Loading...</div>;
  if (error) return <div className="p-4 text-red-500">{error}</div>;

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Upcoming Activities</h2>
      <ul className="space-y-4">
        {activity.map((act) => (
          <ActivityCard act={act} />
        ))}
      </ul>
    </div>
  );
};

export default Home;

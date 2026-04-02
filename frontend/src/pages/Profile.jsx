import React, { useEffect, useState } from 'react';
import axiosInstance from '../instant/axios';
import { Link } from 'react-router-dom';

const Profile = () => {
  const [user, setUser] = useState(null);
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await axiosInstance.get('/profile/getUser');
        setUser(response.data.user);
      } catch (error) {
        console.error('Error fetching profile:', error);
      }
    };

    const fetchTransactions = async () => {
      try {
        const res = await axiosInstance.get('/profile/transactions');
        setTransactions(res.data.transactions || []);
      } catch (error) {
        console.error('Error fetching transactions:', error);
      }
    };

    fetchUserProfile();
    fetchTransactions();
  }, []);

  const handleLogout = async () => {
    try {
      await axiosInstance.get('/profile/logout', { withCredentials: true });
      localStorage.setItem('token', false);
      window.location.href = '/';
    } catch (error) {
      console.error('Logout Error:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center p-4 md:p-10 font-['Roboto']">
      <div className="w-[59vw] mx-auto bg-white shadow-lg rounded-xl p-6 md:p-10">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
          <h2 className="text-3xl font-bold text-[#335288] mb-4 md:mb-0">My Profile</h2>
          <Link to="/" className="text-[#335288] hover:underline text-sm md:text-base">
            ← Back to Home
          </Link>
        </div>

        {user ? (
          <>
            {/* Profile Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
              <div>
                <p className="text-gray-700"><span className="font-semibold">Full Name:</span> {user.fullname}</p>
                <p className="text-gray-700"><span className="font-semibold">Email:</span> {user.email}</p>
                <p className="text-gray-700"><span className="font-semibold">Joined:</span> {new Date(user.createdAt).toLocaleDateString()}</p>
              </div>
              <div>
                <p className="text-gray-700"><span className="font-semibold">Role:</span> {user.role || 'Donor'}</p>
                <p className="text-gray-700"><span className="font-semibold">Status:</span> {user.status || 'Active'}</p>
              </div>
            </div>

            {/* Transactions */}
            <div>
              <h3 className="text-xl font-semibold text-[#335288] mb-4">Donation History</h3>
              {transactions.length > 0 ? (
                <div className="overflow-x-auto">
                  <table className="min-w-full bg-white border border-gray-300 rounded-lg overflow-hidden">
                    <thead className="bg-[#335288] text-white">
                      <tr>
                        <th className="px-4 py-2 text-left text-sm">Date</th>
                        <th className="px-4 py-2 text-left text-sm">Cause</th>
                        <th className="px-4 py-2 text-left text-sm">Amount</th>
                        <th className="px-4 py-2 text-left text-sm">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {transactions.map((tx, index) => (
                        <tr key={index} className="border-b">
                          <td className="px-4 py-2 text-sm">{new Date(tx.date).toLocaleDateString()}</td>
                          <td className="px-4 py-2 text-sm">{tx.cause}</td>
                          <td className="px-4 py-2 text-sm">₹{tx.amount}</td>
                          <td className="px-4 py-2 text-sm">{tx.status}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <p className="text-gray-500">No donations yet.</p>
              )}
            </div>

            {/* Logout Button */}
            <div className="mt-8  gap-10 flex">
              <button
                onClick={handleLogout}
                className="w-full md:w-auto bg-[#335288] hover:bg-transparent hover:text-[#335288] text-white font-semibold border border-[#335288] py-2 px-6 rounded-md transition-all"
              >
                Logout
              </button>
              <Link
                to="/payhistory"
                className="inline-block text-[#335288] border border-[#335288] px-4 py-2 rounded hover:bg-[#335288] hover:text-white transition-colors duration-200 text-sm md:text-base"
              >
                Payment <span className="font-bold">History</span>
              </Link>

            </div>
          </>
        ) : (
          <p className="text-gray-500">Loading profile...</p>
        )}
      </div>
    </div>
  );
};

export default Profile;

"use client"
import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function UserManagement() {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    getUsers();
  }, []);

  const getUsers = async () => {
    try {
      const response = await axios.get('http://localhost:4000/admin/all');
      setUsers(response.data);
    } catch (error) {
      setError('Error fetching users');
    }
  };

  const deleteUser = async (id) => {
    try {
      await axios.delete(`http://localhost:4000/admin/delete/${id}`);
      setUsers(users.filter(user => user.id !== id));
    } catch (error) {
      setError('Error deleting user');
    }
  };

  return (
    <div className="container mx-auto">
      <h1 className="text-3xl font-bold mb-4">User Management</h1>
      {error && <p className="text-red-500">{error}</p>}
      <ul>
        {users.map(user => (
          <li key={user.id} className="flex items-center justify-between border-b border-gray-300 py-2">
            <span className="text-lg">{user.id} - {user.email}</span>
            <button onClick={() => deleteUser(user.id)} className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600">Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

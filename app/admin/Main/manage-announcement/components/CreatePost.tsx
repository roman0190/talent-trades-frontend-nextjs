import { useState } from 'react';
import axios from 'axios';

const CreatePost = ({ setData }) => {
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    content: '',
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("Token");
    try {
      const response = await axios.post(
        'http://localhost:4000/admin/send-announcement', 
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          }
        }
      );
      console.log('Post created:', response.data);
      setShowModal(false);
      setData(prevData => [...prevData, response.data]);
      setFormData({ title: '', content: '' });
      
    } catch (error) {
      console.error('Error creating post:', error);
    }
  };

  return (
    <div>
      <button
        onClick={() => setShowModal(true)}
        className="block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 m-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        type="button"
      >
        Create Announcement
      </button>

      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75">
          <div className="bg-white rounded-lg p-8 max-w-md w-full">
            <h3 className="text-lg font-semibold text-gray-900">Create New Post</h3>
            <form onSubmit={handleSubmit} className="mt-4">
              <div className="mb-4">
                <label htmlFor="title" className="block mb-2 text-sm font-medium text-gray-900">
                  Title
                </label>
                <input
                  type="text"
                  name="title"
                  id="title"
                  value={formData.title}
                  onChange={handleChange}
                  className="bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                  placeholder="Enter title"
                  required
                />
              </div>
              <div className="mb-4">
                <label htmlFor="content" className="block mb-2 text-sm font-medium text-gray-900">
                  Description
                </label>
                <textarea
                  name="content"
                  id="content"
                  value={formData.content}
                  onChange={handleChange}
                  rows="4"
                  className="bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                  placeholder="Enter content"
                  required
                ></textarea>
              </div>
              <button
                type="submit"
                className="bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-white text-sm px-5 py-2.5"
              >
                Post
              </button>
              <button
                onClick={() => setShowModal(false)}
                className="bg-gray-300 hover:bg-gray-400 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-gray-800 text-sm px-5 py-2.5 ml-4"
              >
                Cancel
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default CreatePost;

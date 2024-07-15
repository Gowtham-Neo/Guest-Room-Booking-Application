import React, { useState, useEffect } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { Fragment } from 'react';

const UpdateHouse = ({ isOpen, onClose, house, onUpdateHouse }) => {
  const [house_name, setHouseName] = useState('');
  const [address, setAddress] = useState('');
  const [description, setDescription] = useState('');
  const [rating, setRating] = useState('');
  const [photos, setPhotos] = useState([]);

  useEffect(() => {
    if (house) {
      setHouseName(house.house_name);
      setAddress(house.address);
      setDescription(house.description);
      setRating(house.rating);
      setPhotos(house.photos || []);
    }
  }, [house]);

  const handlePhotoChange = (e) => {
    setPhotos(e.target.files);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('house_name', house_name);
    formData.append('address', address);
    formData.append('description', description);
    formData.append('rating', rating);
    Array.from(photos).forEach((photo) => formData.append('photos', photo));
    onUpdateHouse(house.id, formData);
    onClose();
  };

  return (
    <Transition.Root show={isOpen} as={Fragment}>
      <Dialog as="div" className="fixed inset-0 z-10 overflow-y-auto" onClose={onClose}>
        <div className="flex items-end justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 transition-opacity bg-gray-500 bg-opacity-75" />
          </Transition.Child>

          <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">
            &#8203;
          </span>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enterTo="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <div className="inline-block overflow-hidden text-center align-bottom transition-all transform bg-white rounded-lg shadow-xl sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div className="px-4 pt-5 pb-4 bg-white sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-center">
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                    <Dialog.Title as="h3" className="font-serif text-xl font-medium leading-6 text-gray-900">
                      Update House
                    </Dialog.Title>
                    <div className="flex mt-2 justify-evenly">
                      <form onSubmit={handleSubmit}>
                        <div className="mb-4">
                          <label className="block text-sm font-bold text-gray-700">House Name</label>
                          <input
                            type="text"
                            name="house_name"
                            placeholder="Beach House"
                            value={house_name}
                            onChange={(e) => setHouseName(e.target.value)}
                            className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                            required
                          />
                        </div>
                        <div className="mb-4">
                          <label className="block text-sm font-bold text-gray-700">Address</label>
                          <input
                            type="text"
                            name="address"
                            placeholder="123 Ocean Drive"
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                            className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                            required
                          />
                        </div>
                        <div className="mb-4">
                          <label className="block text-sm font-bold text-gray-700">Description</label>
                          <textarea
                            name="description"
                            placeholder="Describe the house"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                            required
                          ></textarea>
                        </div>
                        <div className="mb-4">
                          <label className="block text-sm font-bold text-gray-700">Rating</label>
                          <input
                            type="string"
                            name="rating"
                            placeholder="Rating"
                            value={rating}
                            onChange={(e) => setRating(e.target.value)}
                            className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                            min="1"
                            max="5"
                            required
                          />
                        </div>
                        <div className="mb-4">
                          <label className="block text-sm font-bold text-gray-700">Photos</label>
                          <input
                            type="file"
                            name="photos"
                            onChange={handlePhotoChange}
                            multiple
                            className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                          />
                        </div>
                        <div className="flex justify-end">
                          <button
                            type="button"
                            className="px-4 py-2 mr-2 text-white bg-gray-500 rounded hover:bg-gray-700 focus:outline-none focus:shadow-outline"
                            onClick={onClose}
                          >
                            Cancel
                          </button>
                          <button
                            type="submit"
                            className="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-700 focus:outline-none focus:shadow-outline"
                          >
                            Update House
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

export default UpdateHouse;

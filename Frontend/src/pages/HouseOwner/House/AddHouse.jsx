import React, { useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { Fragment } from 'react';

const AddHouse = ({ isOpen, onClose, onAddHouse }) => {
  const [house_name, setHouseName] = useState('');
  const [address, setAddress] = useState('');
  const [photos, setPhotos] = useState([]);
  const [description, setDescription] = useState('');
  const [rating, setRating] = useState();
  const owner_id = JSON.parse(localStorage.getItem("user-houseowner")).id;

  const handlePhotoChange = (e) => {
    setPhotos(e.target.files);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('house_name', house_name);
    formData.append('address', address);
    formData.append('owner_id', owner_id);
    formData.append('description', description);
    formData.append('rating', rating);
    Array.from(photos).forEach((photo) => formData.append('photos', photo));
    onAddHouse(formData);
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
                      Add New House
                    </Dialog.Title>
                    <div className="flex mt-2 justify-evenly">
                      <form onSubmit={handleSubmit}>
                        <div className="mb-4">
                          <label className="block text-sm font-bold text-gray-700">House Name</label>
                          <input
                            type="text"
                            name="house_name"
                            placeholder="Peaceful Meadows"
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
                            placeholder="No 83/a, Maariyamman kovil street, Pudur, Vaniyambadi, Vellore-635761"
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
                            placeholder="A cozy house with a beautiful garden"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                            required
                          />
                        </div>
                        <div className="mb-4">
                          <label className="block text-sm font-bold text-gray-700">Rating</label>
                          <input
                            type="number"
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
                            Add House
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

export default AddHouse;
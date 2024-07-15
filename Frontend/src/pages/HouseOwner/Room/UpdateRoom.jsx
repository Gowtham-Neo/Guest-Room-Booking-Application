import React, { useState, useEffect } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { Fragment } from 'react';

const UpdateRoom = ({ isOpen, onClose, onUpdateRoom, ownerId, initialRoomData }) => {
  const [room_name, setRoomName] = useState('');
  const [floor_size, setFloorSize] = useState('');
  const [beds_count, setBedsCount] = useState('');
  const [amenities, setAmenities] = useState('');
  const [min_stay, setMinStay] = useState('');
  const [max_stay, setMaxStay] = useState('');
  const [rent_amount, setRentAmount] = useState('');
  const [description, setDescription] = useState('');
  const [max_guest, setMaxGuest] = useState('');
  const [rating, setRating] = useState('');
  const [photos, setPhotos] = useState([]);

  useEffect(() => {
    if (initialRoomData) {
      setRoomName(initialRoomData.room_name);
      setFloorSize(initialRoomData.floor_size);
      setBedsCount(initialRoomData.beds_count);
      setAmenities(initialRoomData.amenities.join(','));
      setMinStay(initialRoomData.min_stay);
      setMaxStay(initialRoomData.max_stay);
      setRentAmount(initialRoomData.rent_amount);
      setDescription(initialRoomData.description);
      setMaxGuest(initialRoomData.max_guest);
      setRating(initialRoomData.rating);
    }
  }, [initialRoomData]);

  const handlePhotoChange = (e) => {
    setPhotos(Array.from(e.target.files));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('room_name', room_name);
    formData.append('floor_size', floor_size);
    formData.append('beds_count', beds_count);
    formData.append('amenities', amenities);
    formData.append('min_stay', min_stay);
    formData.append('max_stay', max_stay);
    formData.append('rent_amount', rent_amount);
    formData.append('description', description);
    formData.append('max_guest', max_guest);
    formData.append('rating', rating);
    formData.append('owner_id', ownerId);

    photos.forEach((photo) => {
      formData.append('photos', photo);
    });

    onUpdateRoom(formData);
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
            <div className="inline-block overflow-hidden text-center align-bottom transition-all transform bg-white rounded-lg shadow-xl sm:my-8 sm:align-middle sm:max-w-3xl sm:w-full">
              <div className="px-4 pt-5 pb-4 bg-white sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-center">
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                    <Dialog.Title as="h3" className="mt-4 font-serif text-xl font-medium leading-6 text-gray-900">
                      Update Room
                    </Dialog.Title>
                    <div className="flex mt-2 justify-evenly">
                      <form onSubmit={handleSubmit} className="space-y-4">
                        <div>Update Photos</div>
                        <div className="flex flex-col">
                          <label htmlFor="photos" className="mb-2 font-medium text-gray-700">Photos</label>
                          <input
                            type="file"
                            id="photos"
                            multiple
                            onChange={handlePhotoChange}
                            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                          />
                        </div>
                        <button 
                          type="submit"
                          className="px-4 py-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-700 focus:outline-none focus:shadow-outline"
                        >
                          Update Photos
                        </button>
                        <div>Update Room Details</div>
                        <div className="flex flex-wrap -mx-2">
                          <div className="w-full px-2 md:w-1/2">
                            <div className="flex flex-col">
                              <label htmlFor="room_name" className="mb-2 font-medium text-gray-700">Room Name</label>
                              <input
                                type="text"
                                id="room_name"
                                value={room_name}
                                onChange={(e) => setRoomName(e.target.value)}
                                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="Room Name"
                                required
                              />
                            </div>
                          </div>
                          <div className="w-full px-2 md:w-1/2">
                            <div className="flex flex-col">
                              <label htmlFor="floor_size" className="mb-2 font-medium text-gray-700">Floor Size</label>
                              <input
                                type="text"
                                id="floor_size"
                                value={floor_size}
                                onChange={(e) => setFloorSize(e.target.value)}
                                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="Floor Size"
                                required
                              />
                            </div>
                          </div>
                          <div className="w-full px-2 md:w-1/2">
                            <div className="flex flex-col">
                              <label htmlFor="beds_count" className="mb-2 font-medium text-gray-700">Beds Count</label>
                              <input
                                type="number"
                                id="beds_count"
                                value={beds_count}
                                onChange={(e) => setBedsCount(e.target.value)}
                                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="Beds Count"
                                required
                              />
                            </div>
                          </div>
                          <div className="w-full px-2 md:w-1/2">
                            <div className="flex flex-col">
                              <label htmlFor="amenities" className="mb-2 font-medium text-gray-700">Amenities</label>
                              <input
                                type="text"
                                id="amenities"
                                value={amenities}
                                onChange={(e) => setAmenities(e.target.value)}
                                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="Amenities"
                                required
                              />
                            </div>
                          </div>
                          <div className="w-full px-2 md:w-1/2">
                            <div className="flex flex-col">
                              <label htmlFor="min_stay" className="mb-2 font-medium text-gray-700">Minimum Stay</label>
                              <input
                                type="number"
                                id="min_stay"
                                value={min_stay}
                                onChange={(e) => setMinStay(e.target.value)}
                                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="Minimum Stay"
                                required
                              />
                            </div>
                          </div>
                          <div className="w-full px-2 md:w-1/2">
                            <div className="flex flex-col">
                              <label htmlFor="max_stay" className="mb-2 font-medium text-gray-700">Maximum Stay</label>
                              <input
                                type="number"
                                id="max_stay"
                                value={max_stay}
                                onChange={(e) => setMaxStay(e.target.value)}
                                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="Maximum Stay"
                                required
                              />
                            </div>
                          </div>
                          <div className="w-full px-2 md:w-1/2">
                            <div className="flex flex-col">
                              <label htmlFor="rent_amount" className="mb-2 font-medium text-gray-700">Rent Amount</label>
                              <input
                                type="number"
                                id="rent_amount"
                                value={rent_amount}
                                onChange={(e) => setRentAmount(e.target.value)}
                                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="Rent Amount"
                                required
                              />
                            </div>
                          </div>
                          <div className="w-full px-2 md:w-1/2">
                            <div className="flex flex-col">
                              <label htmlFor="description" className="mb-2 font-medium text-gray-700">Description</label>
                              <textarea
                                id="description"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="Description"
                                required
                              />
                            </div>
                          </div>
                          <div className="w-full px-2 md:w-1/2">
                            <div className="flex flex-col">
                              <label htmlFor="max_guest" className="mb-2 font-medium text-gray-700">Max Guests</label>
                              <input
                                type="number"
                                id="max_guest"
                                value={max_guest}
                                onChange={(e) => setMaxGuest(e.target.value)}
                                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="Max Guests"
                                required
                              />
                            </div>
                          </div>
                          <div className="w-full px-2 md:w-1/2">
                            <div className="flex flex-col">
                              <label htmlFor="rating" className="mb-2 font-medium text-gray-700">Rating</label>
                              <input
                                type="string"
                                id="rating"
                                value={rating}
                                onChange={(e) => setRating(e.target.value)}
                                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="Rating"
                                required
                              />
                            </div>
                          </div>
                        </div>
                        <div className="flex justify-end mt-4">
                          <button 
                            type="submit"
                            className="px-4 py-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-700 focus:outline-none focus:shadow-outline"
                          >
                            Update Room
                          </button>
                          <button 
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 ml-2 font-bold text-white bg-gray-500 rounded hover:bg-gray-700 focus:outline-none focus:shadow-outline"
                          >
                            Cancel
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
              <div className="px-4 py-3 bg-gray-50 sm:px-6 sm:flex sm:flex-row-reverse"></div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

export default UpdateRoom;

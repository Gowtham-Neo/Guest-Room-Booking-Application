import React, { useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { Fragment } from 'react';

const AddRoom = ({ isOpen, onClose, onAddRoom, houseId }) => {
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

  const owner_id = JSON.parse(localStorage.getItem("user-houseowner")).id;

  const handlePhotoChange = (e) => {
    setPhotos(Array.from(e.target.files));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('house_id', houseId);
    formData.append('room_name', room_name);
    formData.append('owner_id',owner_id);
    formData.append('floor_size', floor_size);
    formData.append('beds_count', beds_count);
    formData.append('amenities', amenities);
    formData.append('min_stay', min_stay);
    formData.append('max_stay', max_stay);
    formData.append('rent_amount', rent_amount);
    formData.append('description', description);
    formData.append('max_guest', max_guest);
    formData.append('rating', rating);

    photos.forEach((photo) => {
      formData.append('photos', photo);
    });

    for (let pair of formData.entries()) {
      console.log(pair[0] + ': ' + pair[1]); // Log each formData entry
    }

    onAddRoom(formData);
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
                      Add New Room
                    </Dialog.Title>
                    <div className="mt-2">
                      <form onSubmit={handleSubmit} className="space-y-4">
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

                        <div className="flex flex-col">
                          <label htmlFor="description" className="mb-2 font-medium text-gray-700">Description</label>
                          <textarea
                            type="textArea"
                            id="description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Description"
                            required
                          />
                        </div>

                        <div className="flex flex-col">
                          <label htmlFor="max_guest" className="mb-2 font-medium text-gray-700">Maximum Guests</label>
                          <input
                            type="number"
                            id="max_guest"
                            value={max_guest}
                            onChange={(e) => setMaxGuest(e.target.value)}
                            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Maximum Guests"
                            required
                          />
                        </div>

                        <div className="flex flex-col">
                          <label htmlFor="rating" className="mb-2 font-medium text-gray-700">Rating</label>
                          <input
                            type="number"
                            id="rating"
                            value={rating}
                            onChange={(e) => setRating(e.target.value)}
                            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Rating"
                            required
                          />
                        </div>

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
                          className="w-full px-4 py-2 font-bold text-white bg-blue-500 rounded-lg hover:bg-blue-700 focus:outline-none focus:shadow-outline"
                        >
                          Add Room
                        </button>
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

export default AddRoom;

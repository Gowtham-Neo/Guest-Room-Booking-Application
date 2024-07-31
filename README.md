# Guest Room Booking Application

Welcome to the Guest Room Booking Application! This application allows house owners to manage their properties and rooms while enabling customers to browse, check availability, and book rooms.

## Technologies Used
  Frontend: React.js, Tailwind CSS, Fetch API, react-icons
  
  Backend: Node.js, Express.js, PostgreSQL  

## Setup and Installation
Prerequisites

  Node.js and npm
  
  PostgreSQL

## Option 1: Using Render API Link
1. Clone the repository:
   
       git clone https://github.com/Gowtham-Neo/Guest-Room-Booking-Application.git
       cd Guest-Room-Booking-Application

2. Open the frontend directory:

       cd Frontend
3. In the frontend directory, at the root of the Frontend create `.env` file and add the below link.

       VITE_BACKEND_URL=https://room-booking-backend-vd9c.onrender.com
4. Install the frontend dependencies:

        npm install
5. Start the frontend server:

       npm run dev

Open any browser and use this address the see the website `http://localhost:5173/`


## Option 2: Running Both Frontend and Backend Locally

1. Clone the repository:
   
       git clone https://github.com/Gowtham-Neo/Guest-Room-Booking-Application.git
       cd Guest-Room-Booking-Application
   
Backend Setup

1. Navigate to the backend directory:

       cd Backend
2. Install the dependencies:

       npm install

3. In the Backend directory, Open config/config.json and ensure the development configuration matches your PostgreSQL setup:

  ![image](https://github.com/user-attachments/assets/2fcf3ce2-582b-4b30-97a1-d03250b77024)

      npx sequelize-cli db:create
      npx sequelize-cli db:migrate

4. Start the Backend server

       npm start

This will run in the port of `5000`. 

## Frontend Setup
1. Open a new terminal and navigate to the frontend directory:

        cd ../Frontend

2. Install the dependencies:

       npm install

3. Run the frontend server:

       npm run dev

  

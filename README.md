# Fullstack MERN Stack Project

This Fullstack MERN (MongoDB, Express.js, React.js, Node.js) project is a single-page website offering search filtering functionalities including pagination, searching, categorization, and sorting of products.

## Project Features

- **Pagination:** Load products with page numbers and navigation buttons.
- **Search:** Find products by name.
- **Categorization:** Filter products by brand, category, and price range.
- **Sorting:** Sort products by price and date added.
- **Authentication:** Google and Email/Password authentication via Firebase.
- **Responsive Design:** Mobile-first approach for all device sizes.

## Technologies Used

### Frontend
- **React.js:** For building interactive UIs.
- **Tailwind CSS:** Utility-first CSS framework for custom design.
- **Firebase Authentication:** Secure user authentication.

### Backend
- **Node.js:** JavaScript runtime for server-side logic.
- **Express.js:** Framework for building APIs.
- **MongoDB & Mongoose:** NoSQL database with ODM for data modeling.

### Deployment
- **Vercel:** Deployment platform for both client and server.

## Client Side

### Features
- Product display with filtering, searching, and sorting.
- Responsive design optimized for mobile and desktop.
- Firebase Authentication integration.

### Installation

1. **Clone the Repository:**
   ```bash
   git clone https://github.com/saagor16/scic-task-client.git
Install Dependencies:

bash
Copy code
npm install
Setup Environment Variables:
Create a .env file with Firebase configuration.

Start Development Server:

bash
Copy code
npm run dev
Deployment
Install Vercel CLI:

bash
Copy code
npm install -g vercel
Deploy to Vercel:

bash
Copy code
vercel
Live Site:
https://scic-task-client.vercel.app/

Server Side
Features
API for product filtering, searching, and sorting.
Endpoint to add dummy product data.
CORS configuration for specific domains.
Installation
Clone the Repository:

bash
Copy code
git clone https://github.com/saagor16/scic-task-server.git
Install Dependencies:

bash
Copy code
npm install
Setup Environment Variables:
Create a .env file with MongoDB credentials:

makefile
Copy code
DB_ID=your_db_username
DB_PASS=your_db_password
PORT=5000
Start Server:

bash
Copy code
npm start
Deployment
Install Vercel CLI:

bash
Copy code
npm install -g vercel
Deploy to Vercel:

bash
Copy code
vercel
Live Server:
https://scic-task-server-tau.vercel.app/

License
This project is licensed under the MIT License.

css
Copy code

This `README.md` file provides a concise overview of the project, setup instructions, and deploymen

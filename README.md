# Booking System for Iași Locations

## Project Overview

This project is developed as part of the Software Engineering class at the Faculty of Computer Science, Alexandru Ioan Cuza University in Iași. It aims to provide an intuitive and efficient booking system for various locations within Iași. The system features user profile creation, 3D visualization of exteriors and interiors of locations, and deployment on a local server using Docker. This project adheres to strict CSP (Content Security Policy) rules with nonce-based fetching to ensure security and reliability.

### Technologies Used

- **Frontend**: Vite, React
- **Backend**: Node.js, Express.js
- **Database**: Oracle Database
- **Deployment**: Docker
- **Security**: CSP with Nonce-based Fetching

## Features

- User Profile Creation: Allows users to create and manage their profiles.
- 3D Visualization: Provides a 3D view of the exteriors and interiors of the locations available for booking.
- Booking Functionality: Enables users to book locations based on availability and preferences.
- Local Server Deployment: Utilizes Docker for easy deployment and management of the application on a local server.

## How to Use the Project Locally

To run the project on your local machine, follow these steps:

1. Ensure you have Node.js
2. Clone the repository to your local machine.
3. Navigate to the project directory and run the following commands in parallel:

```bash
npm i --force # * keeps dependencies up to date, to be run before the following two if necessary
npm run dev # Starts the Vite React server
npm run dev-node # Starts the Node.js Express server

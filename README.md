# Weather App - Next.js + Laravel (OpenWeatherMap API)

This is a **Weather App** built with **Next.js** (frontend) and **Laravel** (backend) that fetches weather data from the [OpenWeatherMap API](https://openweathermap.org/api). The app is designed with a **decoupled architecture** where the frontend interacts with the backend, which in turn communicates with the weather API. This project is intended to demonstrate proficiency in **frontend development (Next.js)**, **backend (Laravel API)**, and **integration with external APIs**.

## Key Features

- **Weather Forecast**: Displays current weather conditions, wind speed, humidity, and temperature.
- **Next 3 Days Forecast**: Displays the weather forecast for the next three days.
- **Responsive Design**: The app is mobile-first and adapts beautifully to different screen sizes.
- **Unit Toggle**: Allows users to toggle between Celsius and Fahrenheit.
- **Wind Direction**: Displays wind direction using a rotating arrow icon.
- **AJAX Requests**: Fetches weather data asynchronously using the **Fetch API**.
- **Tailwind CSS**: The app uses **Tailwind CSS** for responsive and modern UI components, styled with **RippleUI**.
- **Laravel API**: Backend is built with **Laravel** to interact with the OpenWeatherMap API, acting as a middleware between the frontend and weather API.

## Technologies Used

- **Frontend**: 
  - Next.js (React Framework)
  - TypeScript
  - Tailwind CSS (with RippleUI components)
  - Fetch API
- **Backend**:
  - Laravel (PHP framework)
  - OpenWeatherMap API
- **Tools**:
  - GitHub (for version control)
  - Postman or other HTTP clients for testing API endpoints

## How It Works

1. **Frontend (Next.js)**:
   - The user enters a city name in the search bar.
   - The frontend makes a request to the Laravel API with the city name.
   - The Laravel API fetches weather data from the OpenWeatherMap API.
   - The weather data is returned to the frontend and displayed to the user.

2. **Backend (Laravel)**:
   - The backend API receives city name requests from the frontend.
   - It fetches weather data from the OpenWeatherMap API using a HTTP client.
   - Returns the data in a structured format to the frontend.

## Installation


1. Clone the repository:
   ```bash
   git clone https://github.com/Katchietsnouva/front_end/

2. Navigate to the front end folder of the application:
    ```bash
    cd front_end

3. Install the packages:
    ```bash
    npm install

### Frontend (Next.js) and Backend Setup (Laravel)

1. Open 2 terminals
2. In the 1st terminal, navigate to the api  folder (backend end part folder of our application):
    ```bash
   cd api

3. Then run the following:
    ```bash
    php artisan serve

4. In the second terminal, navigate to the front end folder of the application:
    ```bash
    cd front_end

5. Then run the following
    ```bash
    npm run dev

6. Go to your favorite browser and copy paste the following:
    ```bash
    http://localhost:3000/

7. You shall see the page load.
8. Type your city, town or county for whose wether you want ot find 
9. For example you can search for Nairobi, Accra, Narok, Kisumu, Mombasa, Kiambu, London, Washington DC, etc

### Confirmation of website working

1. Open another terminal and Naivigate to the screenshots of the website test folder
    ```bash
    cd screenshots of the website test

2. If you are in windows type the following:
    ```bash
    explorer .

3. If you are in Linux type the following:
    ```bash
    nautilus .

4. VIew the working test of the website application screenshots.

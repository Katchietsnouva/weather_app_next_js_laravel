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

### Frontend Setup (Next.js)

1. Clone the repository:
   ```bash
   git clone https://github.com/Katchietsnouva/weather_app_next_js_laravel/

2. Open 2 terminals
3. In the 1st terminal, cd to the api folder:
    ```bash
   cd api

4. Then run the following:
    ```bash
    php artisan serve

5. In the second terminal, naviage to the front end of the application:
    ```bash
    cd weather_app_next_js_laravel

6. then run the following
    ```bash
    npm run dev


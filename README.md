# everything-sg

This project is a group project for CS5224 Cloud Computing and consists of two main parts: a **backend (Flask)** and a **frontend (react-app)**.

---

[Demo Website](https://d3voxyqcbctkeg.cloudfront.net) <br/>
[Demo Video](https://drive.google.com/drive/folders/1S8p0TkCg4dIJN0GoDcUQapCGvo7xDv-U?usp=sharing)

Demo User:

```
Email: test_user_2@example.com
Password: testu2

Email: test_user_6@example.com
Password: testu6
```

---

## Backend

The backend folder contains a Python-based Flask server application that powers the APIs and core functionalities.

-   **.gitignore**  
    Specifies which files or directories to exclude from version control. This helps avoid committing sensitive or unnecessary files.

-   **app.py**  
    The entry point of the backend application. It configures the server, sets up routes, and starts the service. This file ties together all the API modules and initializes middleware.

-   **requirements.txt**  
    Lists all the Python dependencies needed by the backend.

-   **database/**  
    Contains modules for database connectivity and operations.

    -   **cache.py**: Implements caching mechanisms to improve performance by storing frequently accessed data.
    -   **db.py**: Provides functionalities to connect to the database, execute queries, and manage transactions.

-   **reference/**  
    Used to store reference data or configurations that the backend might need.

    -   **dummy_data.json**: Provides sample data that may be used during development or testing to simulate real-world data.

-   **v1/**  
    Contains the API endpoints, grouped under version 1 of the API. Each file focuses on a specific functionality:
    -   **attractions.py**:  
        **Endpoint(s):**
        -   `GET /v1/attractions`: Fetch a list of attractions.
    -   **dining.py**:  
        **Endpoint(s):**
        -   `GET /v1/dining`: Fetch dining or restaurant information, including menus and reservation options.
    -   **events.py**:  
        **Endpoint(s):**
        -   `GET /v1/events`: Retrieve a list of events.
    -   **movies.py**:  
        **Endpoint(s):**
        -   `GET /v1/movies`: Retrieve movie listings and show times.
    -   **auth.py**:  
        **Endpoint(s):**
        -   `POST /v1/auth/login`: Authenticate a user and generate a token.
        -   `POST /v1/auth/signup`: Register a new user.
    -   **cart.py**:  
        **Endpoint(s):**
        -   `GET /v1/cart`: Retrieve a user’s shopping cart.
        -   `POST /v1/cart/update`: Add an item to the cart.
    -   **checkout.py**:  
        **Endpoint(s):**
        -   `POST /v1/checkout`: Process checkout and handle payment transactions.
    -   **profile.py**:  
        **Endpoint(s):**
        -   `GET /v1/profile`: Get profile details of the authenticated user.
    -   **utils.py**:  
        A collection of helper functions and shared logic used across multiple API endpoints.

---

## React-App

The react-app folder holds the frontend of the application. It is built with React, TypeScript, and Vite to create a modern and responsive user interface.

-   **.env, .env.development, .env.production**  
    Environment configuration files that store API keys, endpoints, and feature flags for different stages (development, test, and production).

-   **.gitignore**  
    Lists files and folders that should be ignored by Git, ensuring that build artifacts or sensitive information are not tracked.

-   **index.html**  
    The HTML entry point of the application. It bootstraps the React app by linking to the JavaScript bundle produced by Vite.

-   **package.json**  
    Lists project metadata, dependencies, and scripts (e.g., build, start, test) for managing the React app's lifecycle.

-   **tsconfig.app.json, tsconfig.json, tsconfig.node.json**  
    TypeScript configuration files that enforce type safety across the codebase. They specify compiler options and project file includes for different parts of the project (app, overall project, Node.js specific).

-   **vite.config.ts**  
    Configures the Vite bundler, optimizing development builds and enabling use of modern JavaScript features for a smoother development experience.

-   **src/**  
    Contains the source code for the React application, organized into several sub-directories:
    -   **Components:**  
        Reusable UI components, such as buttons, cards, and modals. These components are designed to be easily integrated and customized throughout the app.
    -   **Layouts:**  
        Contains layout components like `ProtectedRoute.tsx`, which is used to restrict access to certain pages based on user authentication status.
    -   **Pages:**  
        Each page represents a distinct view or feature of the app (e.g., Homepage, Movies, EventsPage, Attractions, Dining, BookingPage, CheckoutPage, Login, Signup, Profile). These files coordinate multiple components to define complete screens.
    -   **Store:**  
        Implements state management using contexts (e.g., `AuthContext.tsx` for authentication, `CartContext.tsx` for shopping cart management). This facilitates data sharing across various components.
    -   **Utils:**  
        Contains utility functions and helper modules (like API call wrappers and formatting functions) that support the components and pages.
    -   **Config:**  
        Stores global configuration constants, such as API endpoints and other settings used across the frontend.

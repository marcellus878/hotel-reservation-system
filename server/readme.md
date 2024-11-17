# Project Setup Documentation

## Overview

This documentation guides you through the process of setting up the Flask application on your local machine. It includes steps for cloning the repository, installing dependencies, and running the application.

## Prerequisites

Before you start, make sure that the following software is installed on your machine:

1. **Python 3.x**: Flask requires Python 3.5 or later. You can download Python from [here](https://www.python.org/downloads/).
2. **pip**: Python's package manager, `pip`, should be installed automatically with Python 3.x.
3. **Git**: To clone the repository, Git must be installed. You can download it from [here](https://git-scm.com/downloads).

## Step 1: Clone the Repository

First, clone the repository that contains the Flask application. If you don’t have Git installed, you can download the project as a ZIP file and extract it.

- Open your terminal (Mac) or command prompt (Windows).
- Run the following command to clone the repository:

  ```bash
  git clone https://github.com/Meekio/hotel-reservation-system.git
  ```

- Navigate to the project directory:

  ```bash
  cd server
  ```

## Step 2: Set Up a Virtual Environment (Recommended)

It's highly recommended to use a **virtual environment** to manage dependencies for your project. This ensures that your project doesn’t interfere with other Python projects on your system.

- **For Windows**:

  1. Create a virtual environment:

     ```bash
     python -m venv venv
     ```

  2. Activate the virtual environment:

     ```bash
     venv\Scripts\activate
     ```

- **For Mac/Linux**:

  1. Create a virtual environment:

     ```bash
     python3 -m venv venv
     ```

  2. Activate the virtual environment:

     ```bash
     source venv/bin/activate
     ```

Once activated, your terminal prompt will change to indicate that you're in the virtual environment.

## Step 3: Install Dependencies

Now that the virtual environment is activated, install the required dependencies for the project.

- Run the following command to install the dependencies from the `requirements.txt` file:

  ```bash
  pip install -r requirements.txt
  ```

## Step 4: Run the Flask Application

With the environment set up and dependencies installed, you can now run the Flask server.

- **For Windows**:

  ```bash
  python app.py
  ```

By default, the Flask app will run on **http://127.0.0.1:5000/**. Open your web browser and go to http://127.0.0.1:5000/api/bookings to verify.

## Step 6: Stopping the Server

To stop the Flask server, press **CTRL+C** in the terminal where the server is running.

---

## Troubleshooting

Here are a few common issues and their solutions:

1. **Error: `ModuleNotFoundError`**:

   - Make sure you have activated your virtual environment and installed all dependencies with `pip install -r requirements.txt`.

2. **Error: `Permission Denied`**:

   - On Mac/Linux, you may need to give execute permissions to the `flask` command by running:

     ```bash
     chmod +x flask
     ```

3. **Error: `Address already in use`**:

   - If port `5000` is already occupied, you can run the Flask app on a different port by using:

     ```bash
     flask run --port 8080
     ```

---

## Conclusion

You’ve now set up and run the Flask application on your machine. From here, you can start making changes, adding features, or testing the app as needed.

If you encounter issues or have questions, don’t hesitate to reach out!

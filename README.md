# General Purpose Accounting System

### Backend Setup

1. Clone the repository and navigate to the backend directory.
2. Create a virtual environment and activate it:

```
python -m venv venv
source venv/bin/activate # On Windows use venv\Scripts\activate
```

3. Install the required dependencies:
```
pip install -r requirements.txt
```

4. Setup the PostgreSQL database and add its configurations in the settings.py file.
5. Run the migrations:
   ```
   python manage.py makemigrations
   python manage.py migrate
   ```
6. Start the Django development server:
   ```
    python manage.py runserver
   ```
   It should be running on: http://127.0.0.1:8000/

### Frontend Setup

1. Navigate to the frontend directory from the root of the project.
2. Install the dependencies:
  ```
  npm install
  ```
3. Start the React development server:
  ```
  npm run dev
  ```
  It should be running on: http://localhost:5173/

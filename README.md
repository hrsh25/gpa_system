# General Purpose Accounting System (Finally Take Home assessment)

## Images:
### Login Screen:
![Screenshot 2024-04-02 at 12 00 01 AM](https://github.com/hrsh25/gpa_system/assets/29095913/c5013018-20de-455b-b9b1-08a5559ee91c)

### Home:
![Screenshot 2024-04-02 at 12 00 29 AM](https://github.com/hrsh25/gpa_system/assets/29095913/2dc83d88-3655-4bc7-a697-03348a5da626)

### All Transactions:
![Screenshot 2024-04-02 at 12 00 38 AM](https://github.com/hrsh25/gpa_system/assets/29095913/b000c40f-0ef0-48e4-bcd7-31c7daf06c72)

### Transaction by Account:
![Screenshot 2024-04-02 at 12 00 54 AM](https://github.com/hrsh25/gpa_system/assets/29095913/ba9a3b67-09b4-4fee-a44a-8de92151ab9b)


## Technology Stack

- **Backend**: Django Rest Framework for the API.
- **Frontend**: React for the UI, Material-UI for design components.
- **Database**: PostgreSQL.
- **Authentication**: Django's built-in authentication system with JWT for secure access.

## Features:

### Frontend:
- Login Functionality.
- User can view accounts.
- User can view all transactions.
- User can view transactions by account.

### Backend:
- Rest APIs for the following:
  - Create Account
  - Get all Accounts
  - Create Transaction
  - Get all Transactions
  - Get Transaction by account.
  - Get Transaction by Date

##Setup:

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

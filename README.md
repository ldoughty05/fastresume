# Live Resume Builder
Store all of your projects, activities, and job experience. This app generates a tailored resume based on a job description.

Authors: Luke Doughty, Oscar Hanson, Kojo Tenkorang  

Cornhacks 2025  

## Installation
1. Clone the repository with:  
Linux: 
```{bash}
$ git clone git@github.com:ldoughty05/django-resume-app.git
$ cd django-resume-app
```
Windows: 
```{bash}
$ git clone https://github.com/ldoughty05/django-resume-app
$ cd django-resume-app
```
2. Create and activate a virtual python environment:  
Linux:
```{bash}
$ python3 -m venv env
$ source env/bin/activate
```
Windows:
```{bash}
$ python -m venv env
$ env\scripts\activate.bat
```
3. Install backend packages:  
Linux and Windows:
```{bash}
$ cd backend
$ pip install -r requirements.txt
```
4. Install frontend packages:  
Linux and Windows: 
```{bash}
$ cd ../frontend
$ npm install
```
5. Create .env file
   Add file called ".env" to frontend directory.
   Paste in the following text: VITE_API_URL="http://localhost:8000"
## Running
1. Start the backend.
   From the root directory, run:
```{bash}
$ cd backend
$ python manage.py runserver
```
2. Start the front end.
     In another terminal window, run:
```{bash}
$ cd frontend
$ npm run dev
```

### Navigation
REGISTER: http://localhost:5173/register

LOGIN: http://localhost:5173/register

HOME PAGE: http://localhost:5173/

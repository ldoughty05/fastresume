# Live Resume Builder
Store all of your projects, activities, and job experience. This app generates a tailored resume based on a job description.

Authors: Luke Doughty, Oscar Hanson, Kojo Tenkorang  

Cornhacks 2025  

## Installation
1. Clone the repository with:
```{bash}
$ git clone git@github.com:ldoughty05/django-resume-app.git
$ cd django-resume-app
```
2. Create and activate a virtual python environment.
```{bash}
$ python3 -m venv env
$ source env/bin/activate
```
3. Install backend packages.
```{bash}
$ cd backend
$ pip install -r requirements.txt
```

4. Install frontend packages.
```{bash}
$ cd ../frontend
$ npm install
```

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



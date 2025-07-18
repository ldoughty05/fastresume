#!/bin/bash
pushd /home/pi/Git/fastresume
source backend/venv/bin/activate
# gunicorn backend.wsgi
# gunicorn backend.wsgi:application --config gunicorn.conf.py
popd
echo "Running FastResume..."
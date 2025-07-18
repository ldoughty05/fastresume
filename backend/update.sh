#!/bin/bash
set -e

pushd /home/pi/Git/fastresume/backend

echo "Pulling latest changes..."
git pull origin main
source venv/bin/activate
pip install -r requirements.txt
# python manage.py migrate
# python manage.py collectstatic --noinput
python manage.py check

echo "Restarting FastResume..."
if [ -f gunicorn.pid ]; then
  sudo kill -HUP $(cat gunicorn.pid) # restart Gunicorn
else
  echo "No Gunicorn PID file found, starting fresh."
  sudo systemctl restart fastresumebackend # restart the service
fi

echo `date "+%Y-%m-%d %H:%M:%S.%3N"` ' FastResume updated' >> fastresumebackend_update.log
popd
echo "✅ FastResume updated and restarted successfully."

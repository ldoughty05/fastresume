echo "Starting deployment to FastResume backend..."
set -e
pushd ~/Git/fastresume/backend
source venv/bin/activate

echo "Pulling latest changes from main branch..."
git pull origin main

echo "Installing dependencies..."
pip install --upgrade pip
pip install -r requirements.txt

echo "Django collectstatic and migrate..."
python manage.py collectstatic --noinput
python manage.py migrate --noinput
python manage.py check

echo "Restarting FastResume backend..."
if [ -f gunicorn.pid ]; then
  sudo kill -HUP $(cat gunicorn.pid) # restart Gunicorn
else
  echo "No Gunicorn PID file found, restarting systemd service."
  sudo systemctl restart fastresumebackend # restart the service
fi

echo `date "+%Y-%m-%d %H:%M:%S.%3N"` ' FastResume updated' >> fastresumebackend_update.log
popd
echo "✅ FastResume updated and restarted successfully."
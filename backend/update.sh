echo "💠 Starting deployment to FastResume backend..."
set -e
pushd ~/Git/fastresume/backend
source venv/bin/activate

echo "💠 Pulling latest changes from main branch..."
git pull origin main

echo "💠 Installing dependencies..."
pip install --upgrade pip --quiet
pip install -r requirements.txt --quiet

echo "💠 Django collectstatic and migrate..."
python manage.py collectstatic --noinput
sudo cp -r staticfiles/* /var/www/fastresume-backend

python manage.py migrate --noinput
python manage.py check

echo "💠 Checking if services are running..."
if systemctl is-active --quiet nginx; then
	echo "✅ nginx is running"
else 
	echo "nginx needs to restart"
	sudo systemctl restart nginx
	if systemctl is-active --quiet nginx; then
		echo "✅ nginx restarted successfully and is running"
    	else
        	echo "❌ Failed to restart nginx"
    	fi
fi

sudo systemctl restart fastresumebackend
if systemctl is-active --quiet fastresumebackend; then
	echo "✅ fastresumebackend restarted successfully and is running"
   	else
       	echo "❌ Failed to restart fastresumebackend"
   	fi

echo "💠 $(date "+%Y-%m-%d %H:%M:%S.%3N") FastResume updated" >> fastresumebackend_update.log
popd
echo "✅ FastResume updated and restarted successfully."

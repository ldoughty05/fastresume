echo "💠 Starting FastResume backend..."
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

sudo systemctl restart fastresume-backend
if systemctl is-active --quiet fastresume-backend; then
	echo "✅ fastresume-backend restarted successfully and is running"
   	else
       	echo "❌ Failed to restart fastresume-backend"
   	fi
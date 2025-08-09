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

sudo systemctl restart fastresumebackend
if systemctl is-active --quiet fastresumebackend; then
	echo "✅ fastresumebackend restarted successfully and is running"
   	else
       	echo "❌ Failed to restart fastresumebackend"
   	fi
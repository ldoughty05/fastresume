echo "💠 Starting deployment for FastResume frontend..."
set -e
pushd ~/Git/fastresume/frontend

echo "💠 Pulling latest changes from main branch..."
git pull origin main

echo "💠 Installing dependencies..."
npm install

echo "💠 Creating build..."
npm run build

if [ ! -d dist ] || [ ! -f dist/index.html ]; then
  echo "❌ Build failed — dist folder missing or incomplete"
  exit 1
fi

sudo cp -r dist/* /var/www/fastresume-frontend/

echo "💠 Checking if frontend is live..."
if curl -sSf http://fastresume.org | grep -q "<title>"; then
  echo "✅ Frontend is up!"
else
  echo "❌ Frontend may be down!"
fi

echo "💠 $(date "+%Y-%m-%d %H:%M:%S.%3N") FastResume updated" >> fastresumefrontend_update.log
popd
echo "✅ FastResume frontend updated and restarted successfully."

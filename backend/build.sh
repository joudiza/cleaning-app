

cd frontend 
npm install 
npm run build 
cd .. 
pip install -r requirements.txt 
python manage.py migrate 
python manage.py loaddata statuses.json
python manage.py loaddata rooms.json
python manage.py collectstatic --noinput

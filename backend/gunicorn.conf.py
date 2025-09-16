import multiprocessing

# bind = "unix:/var/www/fastresume-backend/fastresumebackend.sock"
# bind = "unix:/root/Git/fastresume/backend/fastresume-backend.sock"
bind = "unix:/run/fastresume/fastresume-backend.sock;"

workers = 2
threads = 1
timeout = 120
proc_name = "fastresumebackend"

# Access log - records incoming HTTP requests
accesslog = "/root/Git/fastresume/backend/logs/gunicorn-fastresumebackend.access.log"
# Error log - records Gunicorn server goings-on
errorlog = "/root/Git/fastresume/backend/logs/gunicorn-fastresumebackend.error.log"
# Whether to send Django output to the error log
capture_output = True
# How verbose the Gunicorn error logs should be
loglevel = "info"

pidfile = "gunicorn.pid"

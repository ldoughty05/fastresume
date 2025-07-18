import multiprocessing

bind = "unix:/home/pi/Git/fastresume/backend/fastresumebackend.sock"
# bind = "unix:fastresumebackend.sock"

workers = 2
threads = 1
timeout = 120
proc_name = "fastresumebackend"

# Access log - records incoming HTTP requests
accesslog = "/home/pi/Git/fastresume/backend/gunicorn-fastresumebackend.access.log"
# Error log - records Gunicorn server goings-on
errorlog = "/home/pi/Git/fastresume/backend/gunicorn-fastresumebackend.error.log"
# Whether to send Django output to the error log
capture_output = True
# How verbose the Gunicorn error logs should be
loglevel = "info"

pidfile = "gunicorn.pid"

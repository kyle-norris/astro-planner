# syntax=docker/dockerfile:1
FROM python:3.12
WORKDIR /code
COPY requirements.txt /code/requirements.txt
RUN pip install --no-cache-dir --upgrade -r /code/requirements.txt
RUN starplot setup --install-big-sky  # Optional
COPY ./app /code/app
EXPOSE 80
CMD ["fastapi", "run", "app/main.py", "--port", "80"]
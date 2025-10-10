FROM python:3.11-slim
RUN pip install rasa==3.6.18
WORKDIR /app
COPY . /app
CMD ["rasa", "shell"]

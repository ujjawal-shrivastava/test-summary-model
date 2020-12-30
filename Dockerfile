FROM ubuntu:18.04

RUN apt-get update -y && \
    apt-get install -y software-properties-common vim && \
    add-apt-repository ppa:deadsnakes/ppa
RUN apt-get update -y
RUN apt-get install -y build-essential python3.6 python3.6-dev python3-pip python3.6-venv 


# update pip
RUN python3.6 -m pip install pip --upgrade && \
        python3.6 -m pip install wheel
COPY . /app

WORKDIR /app

RUN pip install -r requirements.txt

EXPOSE 5000

ENTRYPOINT ["python3"]
CMD ["app.py"]
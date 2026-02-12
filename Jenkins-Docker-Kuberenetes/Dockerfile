#BASE IMAGE
FROM python:3.9-slim AS builder
#Set the working Directory
WORKDIR /app
#Install the dependencies
COPY requirements.txt .
RUN pip install --no-cache-dir --prefix=/install -r requirements.txt
#This tell install the packages  do not store the cache --no-cache-dir into a folder --prefix=/install  form the -r requirement file 

FROM  python:3.9-slim
WORKDIR /app
COPY --from=builder /install /usr/local
COPY . . 
EXPOSE 5000
CMD["python","app.py"]


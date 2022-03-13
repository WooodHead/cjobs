# Dockerfile

# base image
FROM node:alpine

# create & set working directory
RUN mkdir -p /home/stefan/cjobs
WORKDIR /home/stefan/cjobs

# copy source files
COPY . /home/stefan/cjobs

# install dependencies
RUN npm install

# start app
RUN npm run build
EXPOSE 3000
CMD npm run start
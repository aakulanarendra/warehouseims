### STAGE 1: BUILD ###
FROM node:10 as builder

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

RUN npm install --silent

COPY . .

#RUN npm run build

### STAGE 2: Production Environment ###
#FROM nginx:1.13.12-alpine
#COPY --from=builder /usr/src/app/build /usr/share/nginx/html
#EXPOSE 80
#CMD ["nginx", "-g", "daemon off;"]
EXPOSE 3000
CMD npm start

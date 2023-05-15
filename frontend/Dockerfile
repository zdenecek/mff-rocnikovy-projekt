FROM node:lts-alpine

# make the 'app' folder the current working directory
WORKDIR /var/www/frontend

# copy both 'package.json' and 'package-lock.json' (if available)
COPY package*.json ./

# install project dependencies
RUN npm install

# copy project files and folders to the current working directory 
COPY . .

CMD [ "npm", "run", "build"]
# build app for production with minification
# RUN npm run build
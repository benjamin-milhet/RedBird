FROM node:14-alpine 

# Set the working directory to /app
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the remaining application files to the working directory
COPY . .

# Build the React app
RUN npm run build



# Start the React app
CMD ["npm", "run", "start"]
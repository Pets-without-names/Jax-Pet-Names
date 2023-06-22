FROM node:18

WORKDIR /client_app

# Copy packages first.
# This becomes image layer 1 and only rebuilds when packages change.
# Substantial improvement in build times as a result.
COPY package*.json ./
RUN npm install

# Copy the rest of the app. Image layer 2.
COPY . .

# Expose client port.
EXPOSE 3000

CMD ["npm", "start"]

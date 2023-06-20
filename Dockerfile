FROM node:18

WORKDIR /app

# Copy packages first.
# This becomes image layer 1 and only rebuilds when packages change.
# Substantial improvement in build times as a result.
COPY package*.json ./
RUN npm install

# Copy the rest of the app. Image layer 2.
COPY . .

# Expose client and erver ports.
EXPOSE 3000
EXPOSE 3001

CMD ["npm", "run", "app:start", "--verbose"]

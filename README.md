# M7_Hotels

This microservice is responsible for searching for hotels using the coordinate-based Booking.com API.

## Installation

1. Clone the repository.
2. Navigate to the microservice directory.
3. Run `npm install` to install the dependencies.

## Use

To start the microservice, run:

```bash
npm start

## To build and run the Docker container

docker build -t hotels_microservice .
docker run -p 3000:3000 hotels_microservice .
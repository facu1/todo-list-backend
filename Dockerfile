FROM node:19

RUN mkdir -p /home/app

COPY . /home/app

RUN cd /home/app && npm i && npm run tsc

EXPOSE 3000

CMD ["node", "/home/app/build/index.js"]

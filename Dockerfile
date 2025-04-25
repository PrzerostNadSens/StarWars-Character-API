FROM node:22-alpine3.19 as builder
WORKDIR /app

COPY package.json package-lock.json ./
COPY tsconfig.json tsconfig.build.json ./
COPY prisma ./prisma

RUN npm ci
RUN npx prisma generate

COPY . .

RUN npm run build

FROM node:22-alpine3.19
WORKDIR /app

COPY --from=builder /app/dist .
COPY --from=builder  /app/package.json /app/package-lock.json ./
COPY --from=builder  /app/node_modules ./node_modules

EXPOSE 3000

CMD ["npm", "run", "start:prod:migrate"]
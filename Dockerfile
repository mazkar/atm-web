FROM mhart/alpine-node:12 AS builder
WORKDIR /app
COPY . .
RUN yarn install
RUN yarn run build:devgke

FROM mhart/alpine-node
RUN yarn global add serve
WORKDIR /app
RUN addgroup -S appgroup && adduser -S appuser -G appgroup
RUN chown appuser: /app
COPY --from=builder /app/build .
EXPOSE 8080
USER appuser
CMD ["serve", "-p", "8080", "-s", "."]

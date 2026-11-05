# Multi-stage Dockerfile for SmartPay Spring Boot Backend (Java 21)
# Stage 1: Build the Application
FROM maven:3.9.6-eclipse-temurin-21 AS build
WORKDIR /app

# Copy pom.xml and source code
COPY pom.xml .
COPY src ./src

# Package production executable JAR skipping tests (tests already passed in CI)
RUN mvn clean package -DskipTests

# Stage 2: Production Runtime
FROM eclipse-temurin:21-jre-jammy
WORKDIR /app

# Create non-root system user for security
RUN groupadd -r smartpay && useradd -r -g smartpay smartpay
USER smartpay

# Copy compiled JAR from build stage
COPY --from=build /app/target/smartpay-backend-1.0.0.jar app.jar

# Expose server port
EXPOSE 8080

# Configure production JVM flags and start application
ENV JAVA_OPTS="-Xms256m -Xmx512m -XX:+UseG1GC -XX:+ExitOnOutOfMemoryError"
ENTRYPOINT ["sh", "-c", "java $JAVA_OPTS -jar app.jar"]

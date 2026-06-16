# ---- Stage 1: Build ----
FROM eclipse-temurin:22-jdk AS build
WORKDIR /app

# Copy Maven wrapper and pom first (leverages Docker layer caching)
COPY .mvn/ .mvn/
COPY mvnw pom.xml ./
RUN chmod +x mvnw && ./mvnw dependency:go-offline -B

# Copy source code and build
COPY src/ src/
RUN ./mvnw clean package -DskipTests -B

# ---- Stage 2: Run ----
FROM eclipse-temurin:22-jre
WORKDIR /app

# Copy the built JAR from the build stage
COPY --from=build /app/target/*.jar app.jar

# Create the songs directory (the seeder generates WAV files at runtime)
RUN mkdir -p /app/songs /app/db

# Expose the port Spring Boot listens on
EXPOSE 8080

# Run with production-friendly defaults
ENTRYPOINT ["java", "-jar", "app.jar"]

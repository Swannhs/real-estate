# Use Maven with Java 18 as a base image
FROM maven:3.9.6-amazoncorretto-21

WORKDIR /app

# Copy the source code
COPY . .

# Expose the port
EXPOSE 8185

# Command to run the application using Spring Boot Maven plugin with specific configuration
CMD ["mvn", "spring-boot:run"]

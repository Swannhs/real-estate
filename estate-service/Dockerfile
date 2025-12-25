# Use Maven with Java 18 as a base image
FROM maven:3.9.12-amazoncorretto-21

WORKDIR /app

# Expose the port
EXPOSE 8182

# Command to run the application using Spring Boot Maven plugin with specific configuration
CMD ["mvn", "spring-boot:run"]

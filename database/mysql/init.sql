CREATE DATABASE IF NOT EXISTS `keycloak`;
CREATE DATABASE IF NOT EXISTS `email-service`;

CREATE USER IF NOT EXISTS 'keycloak'@'%' IDENTIFIED BY 'keycloak';
GRANT ALL PRIVILEGES ON `keycloak`.* TO 'keycloak'@'%';
FLUSH PRIVILEGES;

CREATE USER IF NOT EXISTS 'fortunatis'@'%' IDENTIFIED BY 'fortunatis';
GRANT ALL PRIVILEGES ON `email-service`.* TO 'fortunatis'@'%';
FLUSH PRIVILEGES
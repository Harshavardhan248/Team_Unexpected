pipeline {
    agent any

    environment {
        JAVA_HOME = 'C:/Program Files/Java/jdk-17' // Adjust this path based on your Java installation
        MAVEN_HOME = 'C:/Program Files/apache-maven-3.9.9' // Adjust this path based on your Maven installation
        PATH = "${MAVEN_HOME}/bin;${JAVA_HOME}/bin;${env.PATH}"
    }

    stages {
        stage('Checkout') {
            steps {
                echo 'Checking out the repository...'
                checkout scm
            }
        }

        stage('Setup') {
            steps {
                echo 'Setting up environment...'
                script {
                    def pomPath = 'HRportal/pom.xml'
                    if (fileExists(pomPath)) {
                        echo 'Java Maven project detected. Installing dependencies...'
                        dir('TeamUnexpected/HRportal') {
                            bat '"%MAVEN_HOME%/bin/mvn" clean install'
                        }
                    } else {
                        error "No Maven POM file found at ${pomPath}. Ensure the project is set up correctly."
                    }
                }
            }
        }

        stage('Build') {
            steps {
                echo 'Building the project...'
                dir('HRportal') {
                    bat '"%MAVEN_HOME%/bin/mvn" package'
                }
            }
        }

        stage('Test') {
            steps {
                echo 'Running tests...'
                dir('HRportal') {
                    bat '"%MAVEN_HOME%/bin/mvn" test'
                }
            }
        }

    }

    post {
        success {
            echo 'Build and tests succeeded!'
        }
        failure {
            echo 'Build or tests failed!'
        }
        always {
            echo 'Cleaning up workspace...'
            cleanWs()
        }
    }
}

pipeline {
    agent any

    environment {
        JAVA_HOME = 'C:/Program Files/Java/jdk-17' // Adjust based on your Java installation
        MAVEN_HOME = 'C:/Program Files/apache-maven-3.9.9' // Path to Maven installation
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
                echo 'Setting up environment and installing dependencies...'
                dir('HRportal') { // Navigate to HRportal directory where pom.xml is located
                    bat '"C:/Program Files/apache-maven-3.9.9/bin/mvn" clean install'
                }
            }
        }

        stage('Build') {
            steps {
                echo 'Building the project...'
                dir('HRportal') { // Navigate to HRportal directory
                    bat '"C:/Program Files/apache-maven-3.9.9/bin/mvn" package'
                }
            }
        }

        stage('Test') {
            steps {
                echo 'Running tests...'
                dir('HRportal') { // Navigate to HRportal directory
                    bat '"C:/Program Files/apache-maven-3.9.9/bin/mvn" test'
                }
            }
        }

        stage('Deploy') {
            when {
                branch 'main'
            }
            steps {
                echo 'Deploying the application...'
                dir('HRportal') {
                    // Add deployment commands if needed
                    bat 'echo Deployment script would go here'
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

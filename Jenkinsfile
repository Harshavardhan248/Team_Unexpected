pipeline {
    agent any

    environment {
        JAVA_HOME = 'C:\\Program Files\\Java\\jdk-17' // Adjust this path based on your Java installation
        PATH = "${JAVA_HOME}\\bin;${env.PATH}"
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
                    def pomPath = 'TeamUnexpected/HRportal/pom.xml'
                    if (fileExists(pomPath)) {
                        echo 'Java Maven project detected. Installing dependencies...'
                        dir('TeamUnexpected/HRportal') {
                            bat 'mvn clean install'
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
                dir('TeamUnexpected/HRportal') {
                    bat 'mvn package'
                }
            }
        }

        stage('Test') {
            steps {
                echo 'Running tests...'
                dir('TeamUnexpected/HRportal') {
                    bat 'mvn test'
                }
            }
        }

        stage('Deploy') {
            when {
                branch 'main'
            }
            steps {
                echo 'Deploying the application...'
                dir('TeamUnexpected/HRportal') {
                    // Add deployment commands here
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

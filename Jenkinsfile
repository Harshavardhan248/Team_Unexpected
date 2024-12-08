pipeline {
    agent any

    environment {
        JAVA_HOME = 'C:\Program Files\Java\jdk-17' // Adjust this path based on your Jenkins setup
        PATH = "${JAVA_HOME}/bin:${env.PATH}"
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
                    if (fileExists('pom.xml')) {
                        echo 'Java Maven project detected. Installing dependencies...'
                        sh 'mvn clean install'
                    } else {
                        error 'No Maven POM file found. Ensure the project is set up correctly.'
                    }
                }
            }
        }

        stage('Build') {
            steps {
                echo 'Building the project...'
                sh 'mvn package'
            }
        }

        stage('Test') {
            steps {
                echo 'Running tests...'
                sh 'mvn test'
            }
        }

        stage('Deploy') {
            when {
                branch 'main'
            }
            steps {
                echo 'Deploying the application...'
                // Add your deployment commands here
                sh 'echo Deployment script would go here'
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

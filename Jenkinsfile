pipeline {
    agent any

    environment {
        NODE_HOME = 'C:\\Program Files\\nodejs'
        PATH = "${NODE_HOME};${env.PATH}"
    }

    stages {
        stage('Checkout') {
            steps {
                // Checkout the code from the repository
                git url: 'https://github.com/Harshavardhan248/Team_Unexpected', branch: 'main'
            }
        }

        stage('Install Dependencies') {
            steps {
                // Install project dependencies
                bat 'npm install'
            }
        }

        stage('Run Tests') {
            steps {
                // Run the tests
                bat 'npm test -- --watchAll=false'
            }
        }

        stage('Build') {
            steps {
                // Build the project
                bat 'npm run build'
            }
        }
    }

    post {
        always {
            // Archive build artifacts if needed
            archiveArtifacts artifacts: 'build/**', allowEmptyArchive: true
        }
        success {
            echo 'Build and tests were successful!'
        }
        failure {
            echo 'Something went wrong. Please check the logs!'
        }
    }
}

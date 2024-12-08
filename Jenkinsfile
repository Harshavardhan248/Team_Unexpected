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
                // Navigate to the v1 directory and install dependencies
                dir('v1') {
                    bat 'npm install'
                }
            }
        }

        stage('Run Tests') {
            steps {
                // Navigate to the v1 directory and run tests
                dir('v1') {
                    bat 'npm test -- --watchAll=false --passWithNoTests'
                }
            }
        }

        stage('Build') {
            steps {
                // Navigate to the v1 directory and build the project
                dir('v1') {
                    bat 'npm run build'
                }
            }
        }
    }

    post {
        always {
            // Archive build artifacts if needed
            dir('v1') {
                archiveArtifacts artifacts: 'build/**', allowEmptyArchive: true
            }
        }
        success {
            echo 'Build and tests were successful!'
        }
        failure {
            echo 'Something went wrong. Please check the logs!'
        }
    }
}

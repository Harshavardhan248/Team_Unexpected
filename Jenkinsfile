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
    }

    post {
        always {
            // Archive test reports if needed
            dir('v1') {
                archiveArtifacts artifacts: 'npm-debug.log', allowEmptyArchive: true
            }
        }
        success {
            echo 'Tests executed successfully!'
        }
        failure {
            echo 'Tests failed. Please check the logs!'
        }
    }
}

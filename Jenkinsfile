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
              
                dir('./') {
                    bat 'npm install'
                }
            }
        }

        stage('Run Tests') {
            steps {
            
                dir('./') {
                    bat 'npm test -- --watchAll=false'
                }
            }
        }
    }

    post {
        always {
 
            dir('./') {
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

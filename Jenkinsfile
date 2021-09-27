#!groovy
pipeline {
    agent any
    stages {
        stage('Build') {
            steps {
                sh 'chmod 777'
                sh './jenkins-deploy.sh'
            }
        }
    }
}

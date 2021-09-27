#!groovy
pipeline {
    agent any
    stages {
        stage('Build') {
            steps {
                sh 'chmod -cR 777 *'
                sh './jenkins-deploy.sh'
            }
        }
    }
}

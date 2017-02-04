#!/usr/bin/env python2

from fabric.api import task, local, sudo, put, env

env.use_ssh_config = True

@task
def build():
    local("yarn run dist")

@task
def deploy():
    build()
    sudo("rm -rf ~/youkonger-fe/dist")
    put("./dist", "~/youkonger-fe/")
    sudo('rm -f ~/youkonger/views/index.html')
    sudo('ln -s ~/youkonger-fe/dist/index.html ~/youkonger/views/index.html')
    sudo('rm -f ~/youkonger/public/assets')
    sudo('ln -s ~/youkonger-fe/dist ~/youkonger/public/assets')
    sudo('supervisorctl restart youkonger')
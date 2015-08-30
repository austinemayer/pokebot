#   pokebot-oak

*pokebot-oak* is a chat bot based on the [Hubot][hubot] framework.
Originally generated by [generator-hubot][generator-hubot].
Configured for deployment on [Heroku][heroku].

[heroku]: http://www.heroku.com
[hubot]: http://hubot.github.com
[generator-hubot]: https://github.com/github/generator-hubot

##  Resources:

[Heroku](http://www.heroku.com)

[Hubot](http://hubot.github.com)

[Hubot Yeoman Generator](https://github.com/github/generator-hubot)

####    Change adapter

[Hubot Adapters](https://github.com/github/hubot/blob/master/docs/adapters.md)

####    Deployment help

[Deploy with Node](http://devcenter.heroku.com/articles/node-js)

[Deploy on Heroku](https://github.com/github/hubot/blob/master/docs/deploying/heroku.md)

[Deploy on Unix](https://github.com/github/hubot/blob/master/docs/deploying/unix.md)

[Deploy on Windows](https://github.com/github/hubot/blob/master/docs/deploying/unix.md)

####    Adding scripts

[Scripting Guide](https://github.com/github/hubot/blob/master/docs/scripting.md)

* Find new scripts with:
```
npm search hubot-scripts ______
```

####    Troubleshooting

>	If you're having issues, adding this line to your bin/hubot or Heroku .env file to see dev debug info:
```
export HUBOT_LOG_LEVEL="debug"
```

## Running Locally via terminal

* Clone the repospity:
```
git clone git@github.com:Studnicky/pokebot.git && cd pokebot
```

* Set [environment variables](#configuration):
```
HUBOT_HEROKU_KEEPALIVE_URL = (your heroku app url)
HUBOT_SLACK_TOKEN = (your slack API token)
```

* Install prereq's _(requires npm and node to be installed globally)_
```
npm install
```

* To test locally in terminal, start pokebot with gulp:
```
gulp run-local
```

> You should see some start up output and a prompt. If not, you broke it.
```
[Sat Feb 28 2015 12:38:27 GMT+0000 (GMT)] INFO Using default redis on localhost:xxxx
pokebot>
```

* Start using pokebot!
```
pokebot> pokebot help
```

## Using a local postgres install
* [Install postgres](http://www.postgresql.org/download/)

* Log in to posegres as it's default superuser
```
sudo -u postgres psql
```

* Make a new user named pokebot with database creation privileges
```
postgres=#	CREATE USER pokebot CREATEDB CREATEUSER PASSWORD 'oak';
```

* Create a new empty database named pokebot for user pokebot to use
```
postgres=#	CREATE DATABASE pokebot OWNER pokebot TEMPLATE template0;
```

* Exit and log back in as pokebot, enter the password you just made when prompted:
```
postgres=#	\q
$ psql -h localhost -U pokebot
Password for user pokebot:
```

* Make sure the pokebot database exists and belongs to pokebot
```
postgres=# \l

     Name      |  Owner   | Encoding |   Collate   |    Ctype    |   Access privileges   
---------------+----------+----------+-------------+-------------+-----------------------
 pokebot       | pokebot  | UTF8     | en_US.UTF-8 | en_US.UTF-8 | 

(5 rows)
```
> If that's all set up correctly, go ahead and exit psql. Sequelize will do the rest.
```
postgres=#	\q
```

> If that's not what you see, consult the [postgres manual](http://www.postgresql.org/docs/).

##### Database import instructions coming soon

## Extra Configuration

A few scripts (including some installed by default) require environment
variables to be set as a simple form of configuration.

Each script should have a commented header which contains a "Configuration"
section that explains which values it requires to be placed in which variable.
When you have lots of scripts installed this process can be quite labour
intensive. The following shell command can be used as a stop gap until an
easier way to do this has been implemented.
```
    grep -o 'hubot-[a-z0-9_-]\+' external-scripts.json | \
      xargs -n1 -I {} sh -c 'sed -n "/^# Configuration/,/^#$/ s/^/{} /p" \
          $(find node_modules/{}/ -name "*.coffee")' | \
        awk -F '#' '{ printf "%-25s %s\n", $1, $2 }'
```
How to set environment variables will be specific to your operating system.
Rather than recreate the various methods and best practices in achieving this,
it's suggested that you search for a dedicated guide focused on your OS.
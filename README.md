# Tenant Management System (The Digital Garage)

## Before You Begin
Before you begin we recommend you read about the basic building blocks that assemble a MEAN.JS application:
* Mean.JS - Go through [Mean.JS Official Website](http://meanjs.org/) and proceed to their [Documentation](http://meanjs.org/docs.html), which should help you understand Mean.js better.
* Chargeebee - Go through [Chargebee Official Website](https://www.chargebee.com/) and proceed to [Developer Center](https://www.chargebee.com/developers/), which should help you understand about Chargeebee and APIs.
* Sharp Vision Template - [wrapbootstrap.com](https://wrapbootstrap.com/theme/sharp-vision-angularjs-business-theme-WB0T6N6X9).
* Angle Template - [wrapbootstrap.com](https://wrapbootstrap.com/theme/angle-bootstrap-admin-template-WB04HF123).

## Prerequisites
Make sure you have installed all of the following prerequisites on your development machine:
* Node.js - [Download & Install Node.js](http://www.nodejs.org/download/) and the npm package manager. If you encounter any problems, you can also use this [GitHub Gist](https://gist.github.com/isaacs/579814) to install Node.js.
* Bower - You're going to use the [Bower Package Manager](http://bower.io/) to manage your front-end packages. Make sure you've installed Node.js and npm first, then install bower globally using npm:

```bash
$ npm install -g bower
```

* Grunt - You're going to use the [Grunt Task Runner](http://gruntjs.com/) to automate your development process. Make sure you've installed Node.js and npm first, then install grunt globally using npm:

```bash
$ npm install -g grunt-cli
```

## Quick Install
Once you've downloaded the boilerplate and installed all the prerequisites, you're just a few steps away from starting to develop your MEAN application.

The first thing you should do is install the Node.js dependencies. The boilerplate comes pre-bundled with a package.json file that contains the list of modules you need to start your application. To learn more about the modules installed visit the NPM & Package.json section.

To install Node.js dependencies you're going to use npm again. In the application folder run this in the command-line:

```bash
$ npm install
```

This command does a few things:
* First it will install the dependencies needed for the application to run.
* If you're running in a development environment, it will then also install development dependencies needed for testing and running your application.
* Finally, when the install process is over, npm will initiate a bower install command to install all the front-end modules needed for the application

### Change/Set some enviroment variables
You could change some enviroment variables like port, your site's name and site's API Key related to Chargebee.
You could find the following codes in `gruntfile.js` easily.

```
159    default: {
160    	  PORT: 8080,
161    	  chargebeeSite: 'tenant-test',
162    	  chargebeeAPIKey: 'test_Htlw6DLaXvBDjwSsGFm706mX2awaV63cd'
163    },
```
Use the `chargebee.configure` to configure your site and your API key. It is a global configuration and can be setup as part of your server initialization
Of course before that, you must have an account and Test site(Live site) on [Chargebee](https://www.chargebee.com/).

If you are new on Charegebee, you could visit [Chargebee Official Website](https://www.chargebee.com/), create an account and get Test/Live site.

During SignUp process, You should choose a domain for your business(chargebeeSite).
After SignUp/SignIn, go to `Setting/API & WEBHOOKS/API Keys`. You could find the API Key named `full_access_key_v1`.

And then, you must add Redirect URL and Cancel URL for Payment Method Page on Chargebee.
Go to `Setting/HOSTED PAGES SETTINGS/Payment Method Page`.
You could set Redirect URL and Cancel URL there. For instance, `http://localhost:8080/#/account/subscription`.
Change `http://localhost:8080/` to your site's domain there.

As Chargebee allows only 443, 80, 8443, 8080 ports, you must set port value with one of these values.
Intially, MEAN.JS application provide us port 3000, but we cann't use this value as of that reason.

## Running Your Application

### Running in Development mode
After the install process is over, you'll be able to run your application using Grunt, just run grunt default task:

```
$ grunt
```

Your application should run on port 8080 with the *development* environment configuration, so in your browser just go to [http://localhost:8080](http://localhost:8080)

That's it! Your application should be running. To proceed with your development, check the other sections in this documentation.
If you encounter any problems, try the Troubleshooting section.

* explore `config/env/development.js` for development environment configuration options

### Running in Production mode
To run your application with *production* environment configuration, execute grunt as follows:

```bash
$ grunt prod
```

* explore `config/env/production.js` for production environment configuration options

### Running with TLS (SSL)
Application will start by default with secure configuration (SSL mode) turned on and listen on port 8443.
To run your application in a secure manner you'll need to use OpenSSL and generate a set of self-signed certificates. Unix-based users can use the following command:

```bash
$ sh ./scripts/generate-ssl-certs.sh
```

Windows users can follow instructions found [here](http://www.websense.com/support/article/kbarticle/How-to-use-OpenSSL-and-Microsoft-Certification-Authority).
After you've generated the key and certificate, place them in the *config/sslcerts* folder.

Finally, execute grunt's prod task `grunt prod`
* enable/disable SSL mode in production environment change the `secure` option in `config/env/production.js`


## Testing Your Application
You can run the full test suite included with MEAN.JS with the test task:

```bash
$ grunt test
```

This will run both the server-side tests (located in the app/tests/ directory) and the client-side tests (located in the public/modules/*/tests/).

To execute only the server tests, run the test:server task:

```bash
$ grunt test:server
```

And to run only the client tests, run the test:client task:

```bash
$ grunt test:client
```

## Development and deployment With Docker

* Install [Docker](https://docs.docker.com/installation/#installation)
* Install [Compose](https://docs.docker.com/compose/install/)

* Local development and testing with compose:
```bash
$ docker-compose up
```

* Local development and testing with just Docker:
```bash
$ docker build -t mean .
$ docker run -p 27017:27017 -d --name db mongo
$ docker run -p 8080:8080 --link db:db_1 mean
$
```

* To enable live reload, forward port 35729 and mount /app and /public as volumes:
```bash
$ docker run -p 8080:8080 -p 35729:35729 -v /Users/mdl/workspace/mean-stack/mean/public:/home/mean/public -v /Users/mdl/workspace/mean-stack/mean/app:/home/mean/app --link db:db_1 mean
```

## License
Digital Garage

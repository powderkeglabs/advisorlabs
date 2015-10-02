Advisor Labs by PowderKeg
=====

Uses [harp.js](http://www.harp.js) for the front-end and ExpressJS for some API calls.

It's a *mostly* static HTML app and should be served as such.

## Development Setup

```bash
# Step 1 - Clone this repo
$: git clone git@github.com:powderkeglabs/advisorlabs.git

# Step 2 - Install dependencies
$: cd advisorlabs
$: npm Install

# Step 3 - Run the server
$: grunt

Harp is serving the HTML on http://localhost:9000/.  Point your browser here.
The API is now running on http://localhost:3000/

```

#### Why are there two processes?
One is for HarpJS to dynamically serve the view templates. The second is for the backend APIs served in ExpressJS.

#### But why are there TWO processes?!?

We use HarpJS to compile the EJS templates into flat HTML for production. Static HTML is served much faster and allows us to deploy the files to S3, GitHub or just on plan Nginx.  

For development, we don't want to compile the templates each time we make a change. So we run HarpJS on a seperate process and access it on a different port.

## Production Setup

This is still a work in progress.  There are a couple options I have tried.

1. **Deploy on Digital Ocean** - currently how we're running it.
2. **Deploy it on Heroku**


## If deploying Digital Ocean

1. Fire up the NodeJS instance on Ubuntu 14.04 and install
 - **Nginx**
 - **Postgres** ([follow this tutorial](https://www.digitalocean.com/community/tutorials/how-to-use-postgresql-with-your-ruby-on-rails-application-on-ubuntu-14-04) to install and setup a user and database only. Ignore the Rails stuff)
 - **PM2**

2. Clone this Repository

3. Install dependencies using `$: cd <dir> && npm install`

4. Compile the `client` files into static HTML using `$: npm run compile`

5. Configure nginx virtualhost in `/etc/nginx/sites-available/<whatever>`. Here's an example block:

```nginx
server {
  listen 80;
  server_name example.com;
  root /home/YOUR_USER/advisorlabs/client/www;

  location /api/v1 {
     proxy_pass http://<YOUR_SERVER_IP_ADDRESS>:3000;
     proxy_http_version 1.1;
     proxy_set_header Upgrade $http_upgrade;
     proxy_set_header Connection 'upgrade';
     proxy_set_header Host $host;
     proxy_cache_bypass $http_upgrade;
  }
  error_page 404 /404.html;
}
```

6. Make sure to enable the site, then restart nginx using
```
$: sudo service nginx restart
```

7. Start the NodeJS App specifying your own environment variables.
```
$: PORT=<port> DATABASE_URL=postgres://<name>:<pass>@localhost/<db_name> pm2 start server/app.js

```

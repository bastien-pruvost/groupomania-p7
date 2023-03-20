<!-- prettier-ignore-start -->

<!-- Rename all occurences with Cmd + D :

Groupomania - Bootcamp Project
groupomania-p7
groupomania.pruvostbastien.fr
https://groupomania.pruvostbastien.fr
https://www.documentationlink.com

 -->


# Groupomania - Bootcamp Project

Last project of Openclassrooms Web Developer Bootcamp.

[groupomania.pruvostbastien.fr](https://groupomania.pruvostbastien.fr)


## About the project

The goal of this project was to develop a complete corporate social network.


## Features

- Authentication
- Administrator accounts
- List of posts with infinite scroll
- Create a post with text and image
- Like a post
- Comment a post
- Profile page for each user
- Edit profile informations
- Change profile picture


## Tech Stack

#### Client:
- Javascript
- React

#### Server:
- Node.js
- Express
- MariaDB  

Site images are hosted on Cloudinary (profile pictures, cover pictures, post pictures).


## Run locally

### Requirement

**Make sure you have installed the following tools on your computer:**

- [Git](https://git-scm.com/downloads)
- [Node.js](https://nodejs.org/en)
- [MariaDB](https://mariadb.org/download) or [MySQL](https://dev.mysql.com/downloads/mysql/)


1. Clone the project:

```bash
  git clone https://github.com/bastien-pruvost/groupomania-p7.git
```

2. Go to the project directory:

```bash
  cd groupomania-p7
```

3. Initialize the database

You need MySQL or MariaDB installed on your machine.

- Launch the MySQL CLI:

```bash
mysql -u root -p 
```
You are prompted for the root user password (If you haven't created a root password yet, just press the Enter key)

Once logged in to the MySQL CLI as the root user, run the following commands:

- Create a new 'groupomania' database:

```sql
CREATE DATABASE groupomania;
```

- Create the 'groupomania-public' user used by the API:

```sql
CREATE USER 'groupomania-public'@'localhost' IDENTIFIED BY 'QmSpUsXuZw4z6B9EbGdK';
```

- Grant all privileges to the created user to be able to interact with the DB:

```sql
GRANT ALL PRIVILEGES ON groupomania.* TO 'groupomania-public'@'localhost';
```

- Access the created database:

```sql
USE groupomania;
```

- Import the sql dump located in the database folder of the project:

```sql
source ./database/groupomania.sql; 
```

4. Go to the `api` directory:

```bash
  cd api
```

5. Add .env file and add environment variables

```bash
  touch .env
```

6. Install dependencies:

```bash
  pnpm install
  # or
  yarn install
  # or
  npm install
```

7. Run the API:

```bash
  pnpm start
  # or
  yarn start
  # or
  npm start
```

8. Go to the `client` directory with another terminal window:

```bash
  cd client
```

9. Add .env file and add environment variables

```bash
  touch .env
```

10. Install dependencies:

```bash
  pnpm install
  # or
  yarn install
  # or
  npm install
```

11. Run the development server:

```bash
  pnpm start
  # or
  yarn start
  # or
  npm start
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

API Routes can be accessed on [http://localhost:5000](http://localhost:5000)


## Build the front-end

To build the front-end for production usage, run the following command in the `client` folder:

```bash
  pnpm build
  # or
  yarn build
  # or
  npm run build
```

It will create a `build` folder with all static files.


## Start project in production

To start the app in production, make sure you have built the project with the build command from the previous section, then serve the `build` folder with static files:

```bash
  pnpm start
  # or
  yarn start
  # or
  npm start
```


## Report bug / Support

To report a bug or get help [open an issue](https://github.com/bastien-pruvost/groupomania-p7/issues).


## Suggestions

If you have any suggestion, feel free to [open an issue](https://github.com/bastien-pruvost/groupomania-p7/issues) with the tag "enhancement"


## Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

If you have a suggestion that would make this better, please fork the repo and open a pull request.

1. [Fork the project](https://github.com/bastien-pruvost/groupomania-p7/fork)
2. Create your feature branch (`git checkout -b feature/my-feature`)
3. Code your feature
4. Commit your changes (`git commit -m 'feat: add amazing feature'`)
5. Push to the branch (`git push origin feature/my-feature`)
6. [Open a pull request](https://github.com/bastien-pruvost/groupomania-p7/compare)

You can also simply [open an issue](https://github.com/bastien-pruvost/groupomania-p7/issues) with the tag "enhancement".

Don't forget to give the project a star! Thanks again!


## License

Distributed under the [MIT License](https://choosealicense.com/licenses/mit/).

See `LICENSE` file for more information.


<!-- prettier-ignore-end -->

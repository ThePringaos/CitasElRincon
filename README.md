# Citas El Rincón

Citas El Rincón repository

## Getting Started

Download links:

From Github: https://github.com/JonEG/IESELRINCONproject.git

## Prerequisites

You need a working environment with:
* [Git](https://git-scm.com) - You can install it from https://git-scm.com/downloads.
* [MySQL](https://www.mysql.com) o [MariaDB](https://mariadb.org) - You can install it from https://www.mysql.com/downloads/ and https://mariadb.org/dowload respetively.
* [Node.js](https://nodejs.org) - Install node.js from https://nodejs.org/es/download/. It's advisable to install the LTS version.

## General Installation instructions

The best option to start with this project is cloning it in your PC:

```
git clone https://github.com/JonEG/IESELRINCONproject.git
```

You need a node.js working environment. The LTS is recommended: https://nodejs.org/es/

Once you have cloned your project install all dependencies.

From the root of the project:
```
cd frontend
npm install
```

```
cd backend
npm install
```

1. You need a MySQL/MariaDB server working.

2. You have to edit the file backend/src/keys/keys.js, depending on your environment.

```
host: '127.0.0.1',
user: 'dates',
password: 'your_password',
database: 'dates_db',
port: 3306,
dialect: 'mysql'
```

It is recommended to create a dedicated user to manage the database, like 'dates' in our case.

3. Create the mysql database, that in our case is "dates_db".

If you create a dedicated user remember to give privileges over the database. 

Finally to start enjoying this project.

From the root:
```
cd backend
npm run start
```

```
cd frontend
npm run start
```

Enjoy!!!

## Authors
* unknown

## Acknowledgments
* José Juan Rodríguez Martín because of his dedication to teach us.
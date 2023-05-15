

# Bridge tournaments and players database - backend

This is the backend of the Bridge tournaments and players database project. It is a REST API built with Laravel 10.

[Homepage of the project](https://github.com/zdenecek/bridge-database)


## Database migration

To migrate the database, run the following command:

```bash
php artisan migrate
```

## Running tests

## Creating dummy data
### Seeding

To seed the database with dummy data, run the following command:

```bash
php artisan db:seed --class TournamentSeeder
```

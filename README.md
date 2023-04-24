
# Bridge tournaments and players database

This project tries to create a service to store, view, and manage results of bridge tournaments and bridge players.

This is a project for the [Havířov Bridge Academy](https://www.bridzhavirov.cz/).

This is also a year project (ročníkový projekt) for the [Faculty of Mathematics and Physics, Charles University](https://www.mff.cuni.cz/en).

## Project schedule

The project is being developed iteratively, the main goal is to implement tournament and player functionality, and possible extensions will follow.

### Requirements analysis

Basic requirements analysis can be found in the [requirements.md](analysis/requirements.md) file.

A write-up of possible extensions or nice-to-have features can be found in the [extensions.md](analysis/extensions.md) file.

I have decided not to include user stories in the requirements analysis, as I have found them to be too vague and not very useful, especially as the project goal are clean and well defined in requirements

### Design

The domain model can be found in the [domain_model.md](design/domain_model.md) file.

A very basic usecase diagram to guide the development can be found in the [usecase.md](design/usecase.md) file.

#### Mockups

Figma mockup for the project is being [gradually worked on at this address](https://www.figma.com/file/7viqnEaCt7VbuPwxjV9PUJ/matrikabs?node-id=102%3A644&t=disWhiQWDYSMkD8x-1).

The design is taken over from the official site of bridge in Havířov to keep the design consistent with the rest of the site, the color palette is changed to distinguish the system from the rest of the site.

Mockups are not a priority and I fully expect to make the designs on the fly as the mockup process can be very time-consuming.

The design is not final and is subject to change, especially the color palette.


## Project structure

The project is divided into two parts, the backend and the frontend.

Expectation is that the backend will be augmented by workers to perform tasks, including working with external databases, eg. through scraping even.

For now, both frontend and backend are in the same repository, but this is subject to change.

### Backend

The backend is written in PHP 8 using the [Laravel](https://laravel.com/) framework.

The backend is responsible for storing and managing the data and providing an API for the frontend.

### Frontend

The frontend is written in [Vue.js](https://vuejs.org/) (v3).

## Deploying

The goal is to use docker to automate the deployment process.

As of now, the deployment process is manual.

## Testing

TBD

## Authors 
[Zdeněk Tomis](zdenektomis.eu)
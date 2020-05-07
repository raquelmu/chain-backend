# CHAiN

## Instructions how to start

create `.env` file like the example `.env.sample`

start with `npm run start-dev`

**http://localhost:5000**

## Description

It is a collaborative website where you can announce the exchange of objects or services, without economic value.

## Motivation

Being able to facilitate the exchange of favors or services in a time of economic crisis and also encourage solidarity.

## Backlog

List of other features outside of the MVPs scope

User profile: - see my profile - upload my profile picture - see other users profile - list of advertisements created by the user - offer's notifications
Authentication: - verify current user and private routes

## ROUTES:

### Endpoints

| Method  | Path          | description     | Body |
| :----:  | ------------  | --------------- | ---- |
|  GET    | `/ads     `   | list all ads    |      |
|  POST   | `/ads/new`    | create an ad    |      |
|  GET    | `/ads/:id`    | get an ad       |      |
|  PUT    | `/ads/:id`    | update an ad    |      |
|  DELETE | `/ads/:id`    | delete an ad    |      |
|  GET    | `/profile `   | my profile      |      |
|  PUT    | `/profile `   | update profile  |      |
|  DELETE | `/profile `   | delete profile  |      |
|  GET    | `/profile/:id`| other profile   |      |
|  GET    | `/favs     `  | list all favs   |      |


### Auth

| Method | Path      | description    | Body                     |
| :----: | --------- | -------------- | ------------------------ |
|  GET   | `/whoami` | who am i       |                          |
|  POST  | `/signup` | signup a user  | `{ username, password }` |
|  POST  | `/login`  | login a user   | `{ username, password }` |
|  GET   | `/logout` | logout session |                          |

## Models

User model

```javascript
{
	username: String,
	password: String,
	name: String,
	profile_image: String,
	about: String,
	location: String,
	points: Number,
	review: Number (1-5),	
	favs: Array,
}
```

Advertisement model

```javascript
{
	owner: ObjectId<User>
	image: String,
	name: String
	description: String
	contact: { 
		phone: Number,
		email: String,
	}
	date: Date
	location: String
	tags: Array,
	points: Number
	
}
```

## Links

### Trello

https://trello.com/b/R0mL9wfT/chain

### Git

The url to your repository and to your deployed project

[Repository Link](https://github.com/raquelmu/chain-backend)

[Deploy Link](http://heroku.com/)

### Slides

[Slides Link](https://docs.google.com/presentation/d/19rCdx6dtsoV4AR1DGNXZQsT_uFB1OcjoyvwzVWUYvAM/edit#slide=id.p)

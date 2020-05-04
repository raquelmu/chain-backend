# CHAiN

## Instructions how to start

create `.env` file like the example `.env.sample`

start with `npm run start-dev`

**http://localhost:5000**

## Description

It is a collaborative website where you can announce the exchange of objects or services, without economic value.

## Motivation

Consolidate React with your own project where you can put its functionality into practice (components and Backend-Frontend connection)

## User Stories

**404** - As a user I want to see a nice 404 page when I go to a page that doesn’t exist so that I know it was my fault

**500** - As a user I want to see a nice error page when the super team screws it up so that I know that is not my fault

**Homepage** - As a user I want to be able to access the homepage so that I see what the website is about and login and signup

**Sign up** - As a user I want to sign up on the webpage so that I can see all the advertisements

**Login** - As a user I want to be able to log in on the webpage so that I can get back to my account

**Logout** - As a user I want to be able to log out from the webpage so that I can make sure no one will access my account

**Advertisements list** - As a user I want to see all the advertisements available so that I can choose which ones I want to exchange

**Advertisements CRUD** - As a user I want to create, update and delete an advertisement

**Advertisement detail** - As a user I want to see the advertisements details

**Accept exchanges** - As a user I want to be able to accept a offer

## Backlog

List of other features outside of the MVPs scope

User profile: - see my profile - upload my profile picture - see other users profile - list of advertisements created by the user - offer's notifications
Authentication: - verify current user and private routes

## ROUTES:

### Endpoints

| Method  | Path         | description     | Body |
| :----:  | ------------ | --------------- | ---- |
|  GET    | `/protected` | protected route |      |
|  GET    | `/ads     `  | list all ads    |      |
|  POST   | `/ads`       | create an ad    |      |
|  GET    | `/ads/:id`   | get an ad       |      |
|  PUT    | `/ads/:id`   | update an ad    |      |
|  DELETE | `/ads/:id`   | delete an ad    |      |



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
	username: String;
	password: String;
}
```

Advertisement model

```javascript
{
	owner: ObjectId<User>
	name: String
	description: String
	date: Date
	location: String
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

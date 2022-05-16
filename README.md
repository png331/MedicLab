# README

Design folder consists of drawio file containing App structure and DB relations.

This project is using MySQL Database.

This project consists of 3 parts where we fetch data from an rails API using bearer token and display on the UI.
* React front end UI with login;
* UserManager Rails App that communicates directly with the database;
* Rails REST API for React UI.

The REST API is setup to accept calls based on role permission where only admins and doctors can add/update/remove data and patients(basic user) can only call users/:id/examinations (index method).
	
Only admins can access the Rails App and manage roles, drugs and user profiles (add/edit/remove).

The private key for encryption of the `credentials.yml` file is not commited.
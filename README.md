#Used-Computers-Site
A full stack webpage for used computers.

This application consists of two distinct parts.

Excel Reader:
This application converts excel-based inventory files into entries in a local mongodb database. It watches the inventory folder for changes and updates the database as necessary.

Webserver (node and express):
This piece is a standard webserver. It connects to the local mongodb database to get a list of computers that can be displayed on the frontend.

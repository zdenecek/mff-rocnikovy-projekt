
# Requirements

## Introduction

The purpose of this document is to describe the requirements if this project. 
The aim of this project is to create a system to facillitate the recording, managing and presentation of all kinds of tournaments and competitions in the game of bridge.

This project is aimed to be deployed in the Havířov bridge academy (HABRA) and is therefore tailored to the needs of the HABRA.

A list of the requirements is given in the following sections. The requirements stem from the current state of things at HABRA and as such are specialized for the needs of this instituion as opposed to the needs of a different kind of institution (club, federation) in a different setting (state). 

## Where we are coming from

When we look at the Havířov bridge academy (HABRA), we see various means are utilized to manage the tournaments and competitions. The most important of these are the following:

1. The academy website, utilizes many custom formats most commonly of office programs. Pdf and html documents along with diagrams are used.   
     - It takes a lot of time to maintain the website and the presentation is not interactive.
     - To register for tournaments, google spreadsheets are used.
     - See [bridzhavirov.cz](https://www.bridzhavirov.cz/).
2. For some tournaments, the Czech Bridge Federation's solution is used, the matrika (result registry).
     - It is supposed to be used for bigger tournaments of regional importance and club tournaments are entered only as monthly summaries.
     - Does not provide any API.
     - It is an outside system which is not maintained by HABRA and as such features cannot be added for its needs.
     - See [matrikacbs.cz](https://matrikacbs.cz/).
3. A website dedicated to club tournaments is used, which is a custom solution.
     - The website is an archaic piece of software, which is not maintained, is not user friendly, and has a horrid interface. 
     - It not possible expand this system or access the database as the person with access is no longer available.
     - The free hosting it is running on is not reliable and could be taken down any time, specifically when the database is not accessed for a long time.
     - The website provides many presentation features, generates various rankings and statistics even of the more peculiar kind.
     - See [www.bkhavirov.g6.cz](http://www.bkhavirov.g6.cz/).
4. Bridge+More, a dealing solution has been used for some time for the club tournaments, which includes result presentation on its custom website.
    - See [bridgeplusserver.com example tournament](https://bridgeplusserver.com/public-results-details/AQAAACRgAAAAAAAA?session=AQAAAKxkAAAAAAAA).
    - The presentation includes game details.
    - The solution has a user system for players to see tournaments they played in.

## Where we want to go

The goal of this project is to create a system that will be able to replace the current solutions used at HABRA. 

The system should not introduce much overhead to the current workflow of the academy. The system should be able to be used by the current staff of the academy and be as easy to use as possible.

To facilitate for the many uses of the system, it will provide some abstraction over tournaments and tournament series. The system will be able to manage the following:

1. Manage and view the tournaments and competitions of the academy.
2. Create and manage tournament series.
   This point is crucial and has some sub-requirements: 
   - Creating the tournaments in system should not be complicated and allow for flexible imports.
   - Ideally, the system should accept some of the formats currently in use and be able to import the data from them.
   - Ideally, the system should be able to import the data from Matrika CBS.
3. Create and view various rankings and statistics on the tournaments and series, see below

Furthermore, the system will be able to manage the following:

4. Create and manage the players of the academy.
5. Connect users with players and let them see their results.

6. The user system shall be encapsulated in a separate module, which can be used by other systems as to allow for future projects.

Possibly, the system will be able to manage the following:

7. Allow for the scraping of results from external sources on a one-time manual or recurring automated basis.
   - The system will be able to scrape results from the Czech Bridge Federation's matrika.
   - Bridge+More results can be scraped as well. 

Graphically, the system will be able to provide the following:

8. Present the results of the tournaments and competitions in a user friendly manner.
9. Present the rankings and statistics in a user friendly manner.
10. Should work on mobile devices as well. 

11. The system should provide basic interface for navigation which should be configurable by the user.
    - The user should be able to configure what is shown on the main page.
    - The user should be able to configure what links appear in the navigation bar(s).

## Rankings and statistics

Following rankings and statistics are to be implemented. From this requirement follows that the system should be flexible enough to configure for various series and tournaments:

- Point system (competition points) as implemented by the Czech Bridge Federation - mirroring matrikacbs.cz
- Club rankings for months and years
- Středoškolsky pohár (high school cup) - specific tournaments, specific points assigned dependant on tournament type and rank.
- Dorostenecký grandslam - specific tournaments summing up competition points from the whole year.
- Ranking for grand prix tournaments for habra students
- Highscorer for specific tournaments - similar to středoškolský pohár but for a camp consisting of several tournaments.
- Long term statistics for a specific once-a-year types of tournaments - Habra pairs, teams, individual.
- Junior Havířov cup - specific tournaments, specific points assigned dependant on tournament type and rank.
- 

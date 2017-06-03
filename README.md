# Traveler Student Helper Tools (TSHT)

Problem addressed: Find me a safe and affordable place to rent near Department of Computer Science – University of Illinois, Chicago

Author: Alejandro Díaz Vecchio (aldiazve@unal.edu.co)

Description of the solution: We provide real-time data about which place is better to rent, according with differents custom filters like price, security, distance from the Department of Computer Science and more.

Keywords: Real State, Rend prices, Chicago, Real-time, Security, Lifestyle.

### Live project web

You can see this project running live on:

```
https://aldiazve.github.io/
```

### Datasets used in Traveler Student Helper Tools (TSHT)

##### Libraries - Locations, Hours and Contact Information [source](https://catalog.data.gov/dataset/libraries-locations-hours-and-contact-information-f3c61)

Description:

Chicago Public Library locations, contact information, and hours of operation.

Data columns used:

data\[n\] = Library Info Object  
data\[n\]\[9\] = Library name  
data\[n\]\[10\] = Operation hours  
data\[n\]\[17\] = Phone  
data\[n\]\[18\] = Localization object  
data\[n\]\[18\]\[1\] = Latitude value  
data\[n\]\[18\]\[2\] = Longitude value  

##### Crime Map [Dataset Source](https://data.cityofchicago.org/Public-Safety/Crimes-One-year-prior-to-present/x2n5-8w5q) [Map Source](https://data.cityofchicago.org/Public-Safety/Crimes-Map/dfnk-7re6)

This map show all crimes on Chicago, I use the map implementation from Socrata.

- [ ] Do you use the primary dataset ”online climate data” from data.gov?
- [x] Are all these datasets from data.gov or data.indy.gov? If not, where are they coming from (links)?



### Introduction

Traveler Student Helper Tools (TSHT) is a web app that helps students to find a place to rent around their university. The strength of Traveler Student Helper Tools (TSHT) is the multiple search filters that are available, like police stations around the place, parks, hospitals, and more. Also Traveler Student Helper Tools (TSHT) can show recreation places around your choise, like distance to the beach, close restaurants and pubs, and more.

### Map View Info

- [x] Basic Map with specific location (your map is located in a meaningful place, city of west lafayette for example)

The default position of the map is the Department of Computer Science – University of Illinois, Chicago :
```javascript
const DCS_UI_POSITION = {lat: 41.870808, lng : -87.650390};
```
 

### Data visualization

- [ ] [describe] Use Graph? What is the type? (bar chart, pie chart, radar chart ...)
- [ ] [List] Any interaction available on the graph? List them (enable click on numbers, drag on lines, change time/variables ...)

### Interaction Form:

- [x] [Labels] Any information output? list them. (text field, text area, label, plain HTML ...)
- [x] [Work in progress] Any operation option (filters)? List them. (search markets, search vegetables, filter based on price, sort based on convenience ...)
- [x] [Work in progress] Any information input? List them. (comments, markers, user preference ...)
- [ ] [] Interaction with Map? List them. (filter on price will affect map markers, sort on price will affect map markers, ...)
- [ ] [] Interaction with data visualization? List them. (filter, sort, set variables ...)

### Build setup

I spend the whole first iteration learning how to use a couple of tools:

- [node.js](https://nodejs.org/en/)
- [browserify](http://browserify.org/)
- [babel](https://babeljs.io/)
- [boostrap](http://getbootstrap.com/)

But, to make easier the test of the project, I've made a bundle with all the necessary javascript code and the Boostrap.css file is also local. To do that I've used browserify and babel, also babel to be able to use ES6. So you only have to run the http-server using the tsht folder as root.

### Browsers support

Tested on:

- [x] Chrome
- [x] Safari 
- [x] Firefox 
- [x] Edge 
- [ ] Opera 

Successfully running on:

- [x] Chrome 
- [x] Safari
- [x] Firefox 
- [x] Edge 
- [ ] Opera 

## MASHUP

### Development process

1. Explore datasets:

Search for basic dataset to use, those datasets must have usefull info, the selected dataset are listing on top of the file.

2. Setting the github project, adding basic info and the readme file.

3. Exploring usefull tools to develop, like:

- [node.js](https://nodejs.org/en/)
- [babel](https://babeljs.io/)
- [browserify](http://browserify.org/)

4. Exploring google maps api:

- [basic map](https://developers.google.com/maps/documentation/javascript/adding-a-google-map)
- [markers](https://developers.google.com/maps/documentation/javascript/markers)
- [direcctions](https://developers.google.com/maps/documentation/javascript/directions)

5. Fighting with the Zillow API

- [zillowAPI](https://www.zillow.com/howto/api/APIOverview.htm)

6. Looking for a good color themplate on adobe web:

- [color themeplate](https://color.adobe.com/es/explore/?filter=newest)

### Particular problems and how I solved them.

1. sync functions:

At the very beginning of the contest I had to face a big problem: When I use a XTMHttpRequest to get the datasets info the sequential execution of the code was broken. So, first I thought that I can use EC6 to force the app to wait the response. Later I see that that solution wasn't user friendly, becouse the user has to wait without any feedback. So I re design the filters of the app to show a 'status'. The user can enable/disable a filter, like "Show libraries", but the button that alow that will be disable until the json was succefully loaded, on an error case, the button will show a "broken state", indicating him that the filter is not available (and will be not). 

Any way, I learn how to use browserify, babel, and a bit of node.js (the monitoring module particulary). But I spend a lot of time learnig all those things, so I'm in a hurry right now.

2. Getting info from Zillow:

To get the info I have to use one dataset to get addresses:

[Affordable Rental Housing Developments](https://catalog.data.gov/dataset/affordable-rental-housing-developments-ef5c2)

Use this dataset to get differents addresses of buildings on Chicago. Next, you I use one of the Zillow API call: 

[GetSearchResults API](https://www.zillow.com/howto/api/GetSearchResults.htm)

That call take 4 parameters:

- Your zillow id to make API calls
- The address of the propierty (that you get from the dataset)
- The city and state zip: Chicago, IL; and
- The rentzestimate boolean value, you must set this in true

If the propierty exist in the zillow database, you will get a rent stimate on the response, if not, you will get an 508 error.

This particular solve have a really big problem, as a 'free' user of zillow api, you only can make 1000 call per day, and, the dataset have around 200 builds, and a lot of them aren't on the zillow database, so, you have to make something in order to reduce the api calls (like filter the distance around the university, and olny search the build there).

A valid call looks like:
```
http://www.zillow.com/webservice/GetSearchResults.htm?zws-id=<ZWSID>&address=2114+Bigelow+Ave&citystatezip=Seattle%2C+WA&rentzestimate=true
```

and to handle de XML response, I use one module of node.js:

[XMLtoJSON](https://github.com/metatribal/xmlToJSON)


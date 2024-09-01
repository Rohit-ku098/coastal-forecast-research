const express = require("express");
const app = express();
const axios = require("axios");
const fs = require('fs');
const Path = require('path');

app.get("/swell", (req, res) => {
    axios
      .get(
        "https://samudra.incois.gov.in/incoismobileappdata/rest/incois/getdata?resolution=0.25&forecastdate=20240829&filename=2024-08-30_06-00-00_swell.json"
      )
      .then((response) => {

        const header = response.data[0].header;
        const data = response.data[0].data;
        
        // Function to find the closest index
        function findIndex(lat, lon, header) {
          // Calculate the index positions based on the latitude and longitude
          const iLat = Math.floor((header.la1 - lat) / header.dy);
          const iLon = Math.floor((lon - header.lo1) / header.dx);
          return { iLat, iLon };
        }

        // Example latitude and longitude to extract data for
        const latitude = 19.24;
        const longitude = 87.06;


        // Calculate the indices
        const { iLat, iLon } = findIndex(latitude, longitude, header);

        // Extract the corresponding data from the flat data array
        const dataIndex = iLat * header.nx + iLon;
        const extractedValue = data[dataIndex];

        console.log(
          `Swell surge data at latitude ${latitude} and longitude ${longitude}: ${extractedValue}`
        );

        res.send(response.data);
      })
      .catch((error) => {
        res.send(error);
      });
});


app.get("/district", (req, res) => {
    axios
      .get(
        "https://samudra.incois.gov.in/incoismobileappdata/rest/incois/districtpolygons"
      )
      .then((response) => {
        res.send(response.data);
      })
      .catch((error) => {
        res.send(error);
      });
})






app.listen(3000, () => {
    console.log("Listening on port 3000");
});

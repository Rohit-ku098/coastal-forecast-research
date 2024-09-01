const axios = require("axios");
const fs = require("fs");
const Path = require("path");
const {downloadImage} = require('./downloadImage')

// var qs = (function (a) {
//   if (a == "") return {};
//   var b = {};
//   for (var i = 0; i < a.length; ++i) {
//     var p = a[i].split("=");
//     if (p.length != 2) continue;
//     b[p[0]] = decodeURIComponent(p[1].replace(/\+/g, " "));
//   }
//   return b;
// })(window.location.search.substr(1).split("&"));

var qs = { region: "coastal", area: "orissa", param: "swell", ln: "en" };

var region = qs["region"];
var area = qs["area"];
var param = qs["param"];
var lan = qs["ln"];
image_name = region + "/" + area + "/" + lan + "/" + param; //the base "path/name" of the image set without the numbers
image_type = "gif"; //"gif" or "jpg" or whatever your browser can display

if (lan == "en") {
  image_name = region + "/" + area + "/" + param;
} else {
  image_name = region + "/" + area + "/" + lan + "/" + param;
}
//var dt = new Date();
//alert(dt.getTime());
first_image = 0; //first image number
last_image = 55; //last image number
//!!! the size is very important - if incorrect, browser tries to
//!!! resize the images and slows down significantly
animation_height = 600; //height of the images in the animation
animation_width = 600; //width of the images in the animation
//=== THE CODE STARTS HERE - no need to change anything below ===
//=== global variables ====
var theImages = new Array();

//===> preload the images - gets executed first, while downloading the page
//first day
var fst = new Date();
var fd = fst.getDate();
var fm = fst.getMonth() + 1;
var year = fst.getYear();
if (year < 1000) year += 1900;
var dd;
var mn;
if (fd <= 9) {
  fd = "0" + fd;
}
if (fm <= 9) {
  fm = "0" + fm;
}
var fstDay = fd + "-" + fm + "-" + year;
// second day
var s = new Date();
var milli = s.getTime() + 86400000;
s.setTime(milli);
var sd = s.getDate();
var sm = s.getMonth() + 1;
if (sd <= 9) {
  sd = "0" + sd;
}
if (sm <= 9) {
  sm = "0" + sm;
}
var sndDay = sd + "-" + sm + "-" + year;
// Third day
var t = new Date();
var mt = t.getTime() + 86400000 * 2;
t.setTime(mt);
var td = t.getDate();
var tm = t.getMonth() + 1;
if (td <= 9) {
  td = "0" + td;
}
if (tm <= 9) {
  tm = "0" + tm;
}
var trdDay = td + "-" + tm + "-" + year;
// Fourth Day
var f = new Date();
var mf = f.getTime() + 86400000 * 3;
f.setTime(mf);
var frd = f.getDate();
var frm = f.getMonth() + 1;
if (frd <= 9) {
  frd = "0" + frd;
}
if (frm <= 9) {
  frm = "0" + frm;
}
var frtDay = frd + "-" + frm + "-" + year;
// Fifth Day
var fi = new Date();
var mfi = fi.getTime() + 86400000 * 4;
fi.setTime(mfi);
var fid = fi.getDate();
var fim = fi.getMonth() + 1;
if (fid <= 9) {
  fid = "0" + fid;
}
if (fim <= 9) {
  fim = "0" + fim;
}
var fifDay = fid + "-" + fim + "-" + year;
//Sixth Day
var si = new Date();
var msi = si.getTime() + 86400000 * 5;
si.setTime(msi);
var sid = si.getDate();
var sim = si.getMonth() + 1;
if (sid <= 9) {
  sid = "0" + sid;
}
if (sim <= 9) {
  sim = "0" + sim;
}
var sisDay = sid + "-" + sim + "-" + year;
// Seventh Day
var se = new Date();
var mse = se.getTime() + 86400000 * 6;
se.setTime(mse);
var sed = se.getDate();
var sem = se.getMonth() + 1;
if (sed <= 9) {
  sed = "0" + sed;
}
if (sem <= 9) {
  sem = "0" + sem;
}
var senDay = sed + "-" + sem + "-" + year;
var dt;

if (param == "wind") {
  dt = dt = [
    "" + fstDay + "--0530",
    "" + fstDay + "--1130",
    "" + fstDay + "--1730",
    "" + fstDay + "--2330",
    "" + sndDay + "--0530",
    "" + sndDay + "--1130",
    "" + sndDay + "--1730",
    "" + sndDay + "--2330",
    "" + trdDay + "--0530",
    "" + trdDay + "--1130",
    "" + trdDay + "--1730",
    "" + trdDay + "--2330",
    "" + frtDay + "--0530",
    "" + frtDay + "--1130",
    "" + frtDay + "--1730",
    "" + frtDay + "--2330",
    "" + fifDay + "--0530",
    "" + fifDay + "--1130",
    "" + fifDay + "--1730",
    "" + fifDay + "--2330",
    "" + sisDay + "--0530",
    "" + sisDay + "--1130",
    "" + sisDay + "--1730",
    "" + sisDay + "--2330",
    "" + senDay + "--0530",
    "" + senDay + "--1130",
    "" + senDay + "--1730",
    "" + senDay + "--2330",
  ];
} else {
  dt = [
    "" + fstDay + "--0230",
    "" + fstDay + "--0530",
    "" + fstDay + "--0830",
    "" + fstDay + "--1130",
    "" + fstDay + "--1430",
    "" + fstDay + "--1730",
    "" + fstDay + "--2030",
    "" + fstDay + "--2330",
    "" + sndDay + "--0230",
    "" + sndDay + "--0530",
    "" + sndDay + "--0830",
    "" + sndDay + "--1130",
    "" + sndDay + "--1430",
    "" + sndDay + "--1730",
    "" + sndDay + "--2030",
    "" + sndDay + "--2330",
    "" + trdDay + "--0230",
    "" + trdDay + "--0530",
    "" + trdDay + "--0830",
    "" + trdDay + "--1130",
    "" + trdDay + "--1430",
    "" + trdDay + "--1730",
    "" + trdDay + "--2030",
    "" + trdDay + "--2330",
    "" + frtDay + "--0230",
    "" + frtDay + "--0530",
    "" + frtDay + "--0830",
    "" + frtDay + "--1130",
    "" + frtDay + "--1430",
    "" + frtDay + "--1730",
    "" + frtDay + "--2030",
    "" + frtDay + "--2330",
    "" + fifDay + "--0230",
    "" + fifDay + "--0530",
    "" + fifDay + "--0830",
    "" + fifDay + "--1130",
    "" + fifDay + "--1430",
    "" + fifDay + "--1730",
    "" + fifDay + "--2030",
    "" + fifDay + "--2330",
    "" + sisDay + "--0230",
    "" + sisDay + "--0530",
    "" + sisDay + "--0830",
    "" + sisDay + "--1130",
    "" + sisDay + "--1430",
    "" + sisDay + "--1730",
    "" + sisDay + "--2030",
    "" + sisDay + "--2330",
    "" + senDay + "--0230",
    "" + senDay + "--0530",
    "" + senDay + "--0830",
    "" + senDay + "--1130",
    "" + senDay + "--1430",
    "" + senDay + "--1730",
    "" + senDay + "--2030",
    "" + senDay + "--2330",
  ];
}
for (var i = 0; i < dt.length; i++) {
  //   theImages[i].src ="/OSF_FILES/forecast/"+image_name+"/"+dt[i]+"."+image_type;
  theImages[i] =
    "/OSF_FILES/forecast/" + image_name + "/" + dt[i] + "." + image_type;
    (async function() {
        await downloadImage(theImages[i]);
    })()
  //document.write(spimages[i]+"."+image_type+"--------------- i value is :"+i+"------ Image Source : "+theImages[i].src+"<br>");
}

// console.log(theImages);
// console.log(theImages.length);

// async function downloadImage(params) {
//   let img_name = params.split("/").pop();
//   const url = `https://incois.gov.in/${params}`;
//   const path = Path.resolve(__dirname, "images", img_name);
//   const writer = fs.createWriteStream(path);

//   const response = await axios({
//     url,
//     method: "GET",
//     responseType: "stream",
//   });

//   response.data.pipe(writer);

//   return new Promise((resolve, reject) => {
//     writer.on("finish", resolve);
//     writer.on("error", reject);
//   });
// }

// delete image
async function deleteImages(theImages) {
    for (var i = 0; i < theImages.length; i++) {
      let img_name = theImages[i].split("/").pop();
      const path = Path.resolve(__dirname, "images", img_name);
      console.log(path);
      await fs.unlinkSync(path);
    }
}



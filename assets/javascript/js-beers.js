var allCategories = []
var uniqCatsStr = []
var uniqCategoriesIds = []

var allStylesIds = []
var uniqStlesIds= []

var amountOfBeers = json.data.length

for (i = 0; i < amountOfBeers; i++) {
  allCategories[i] = json.data[i].style.category.id + ' - ' + json.data[i].style.category.name
  allStylesIds[i] = json.data[i].style.id
}

var uniqCatsStr = allCategories.reduce(function(a,b){
    if (a.indexOf(b) < 0 ) a.push(b);
    return a;
},[]);

for (i = 0; i < uniqCatsStr.length; i++) {
  uniqCategoriesIds[i] = parseInt(uniqCatsStr[i].split(" - ")[0])

}

var uniqStlesIds = allStylesIds.reduce(function(a,b){
  if (a.indexOf(b) < 0 ) a.push(b);
  return a;
},[]);

console.log("-----------------")
console.log("amountOfBeers: " + amountOfBeers)
console.log("-----------------")
console.log("uniqCategoriesIds: " + uniqCategoriesIds)
console.log("-----------------")
console.log("uniqStlesIds: ")
console.log(uniqStlesIds)
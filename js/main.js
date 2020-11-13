
loadData();

// load data
function loadData() {
    d3.csv("data/netflix").then(data => {

        csv = data;

        console.log(csv)

        matrix = new Matrix("matrix", csv, dataMarriages, dataBusiness);

    });
}
// //define data array
// var tabledata = [
//     {id:1, name:"Oli Bob", progress:12, gender:"male", rating:1, col:"red", dob:"19/02/1984", car:1},
//     {id:2, name:"Mary May", progress:1, gender:"female", rating:2, col:"blue", dob:"14/05/1982", car:true},
//     {id:3, name:"Christine Lobowski", progress:42, gender:"female", rating:0, col:"green", dob:"22/05/1982", car:"true"},
//     {id:4, name:"Brendon Philips", progress:100, gender:"male", rating:1, col:"orange", dob:"01/08/1980"},
//     {id:5, name:"Margret Marmajuke", progress:16, gender:"female", rating:5, col:"yellow", dob:"31/01/1999"},
//     {id:6, name:"Frank Harbours", progress:38, gender:"male", rating:4, col:"red", dob:"12/05/1966", car:1},
// ];
//
// //initialize table
// var table = new Tabulator("#global_expansion_table", {
//     data:tabledata,           //load row data from array
//     layout:"fitColumns",      //fit columns to width of table
//     responsiveLayout:"hide",  //hide columns that dont fit on the table
//     tooltips:true,            //show tool tips on cells
//     addRowPos:"top",          //when adding a new row, add it to the top of the table
//     history:true,             //allow undo and redo actions on the table
//     pagination:"local",       //paginate the data
//     paginationSize:7,         //allow 7 rows per page of data
//     movableColumns:true,      //allow column order to be changed
//     resizableRows:true,       //allow row order to be changed
//     initialSort:[             //set the initial sort order of the data
//         {column:"name", dir:"asc"},
//     ],
//     columns:[                 //define the table columns
//         {title:"Name", field:"name", editor:"input"},
//         {title:"Task Progress", field:"progress", hozAlign:"left", formatter:"progress", editor:true},
//         {title:"Gender", field:"gender", width:95, editor:"select", editorParams:{values:["male", "female"]}},
//         {title:"Rating", field:"rating", formatter:"star", hozAlign:"center", width:100, editor:true},
//         {title:"Color", field:"col", width:130, editor:"input"},
//         {title:"Date Of Birth", field:"dob", width:130, sorter:"date", hozAlign:"center"},
//         {title:"Driver", field:"car", width:90,  hozAlign:"center", formatter:"tickCross", sorter:"boolean", editor:true},
//     ],
// });

//define data array
var globalExpansion = [
    {id:1, Year:"2020", international:122.07, USA:73.08},
    {id:2, Year:"2019", international:106.1, USA:61.0},
    {id:3, Year:"2018", international:80.8, USA:58.5},
    {id:4, Year:"2017", international:57.8, USA:52.8},
    {id:5, Year:"2016", international:41.2, USA:47.9},
    {id:6, Year:"2015", international:27.4, USA:43.4},
];

//initialize table
var table = new Tabulator("#global_expansion_table", {
    data:globalExpansion,           //load row data from array
    layout:"fitColumns",      //fit columns to width of table
    height:"225px",
    width: "500px",
    responsiveLayout:"hide",  //hide columns that dont fit on the table
    tooltips:true,            //show tool tips on cells
    addRowPos:"top",          //when adding a new row, add it to the top of the table
    history:true,             //allow undo and redo actions on the table
    paginationSize:1,         //allow 7 rows per page of data
    movableColumns:true,      //allow column order to be changed
    resizableRows:true,       //allow row order to be changed
    initialSort:[             //set the initial sort order of the data
        {column:"Year", dir:"asc"},
    ],
    columns:[                 //define the table columns
        {title:"Year", field:"Year", width:130, sorter:"date", hozAlign:"center"},
        {title:"International Subscribers (in Millions)", field:"international", hozAlign:"center", sorter:"number"},
        {title:"United States Subscribers (in Millions)", field:"USA", hozAlign:"center", sorter:"number"},
    ],
});
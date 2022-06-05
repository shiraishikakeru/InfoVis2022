let input_data;
let line_chart;
let bar_chart;
let filter = [];

d3.csv("https://shiraishikakeru.github.io/InfoVis2022/FinalTask/data_final.csv")
    .then( data => {
        input_data = data;
        input_data.forEach( d => {
            d.date = +d.date;
            d.kind = d.kind;
            d.value = +d.value;
        });

        const color_scale = d3.scaleOrdinal( d3.schemeCategory10 );
        color_scale.domain(['Cafe/Sweets','Family-restaurant/Fast-food','Bar']);

        line_chart = new LineChart( {
            parent: '#drawing_region_linechart',
            width: 512,
            height: 512,
            margin: {top:10, right:10, bottom:50, left:90},
            xlabel: 'Year-Month-Week',
            ylabel: 'Number of views [%]',
            cscale: color_scale
        }, input_data );
        line_chart.update();

        bar_chart = new BarChart( {
            parent: '#drawing_region_barchart',
            width: 512,
            height: 512,
            margin: {top:10, right:10, bottom:50, left:90},
            xlabel: 'Restaurant Type',
            ylabel: 'Number of views',
            cscale: color_scale
        }, input_data );
        bar_chart.update();
    })
    .catch( error => {
        console.log( error );
    });

function Filter() {
    if ( filter.length == 0 ) {
        line_chart.data = input_data;
    }
    else {
        line_chart.data = input_data.filter( d => filter.includes( d.kind ) );
    }
    line_chart.update();
}

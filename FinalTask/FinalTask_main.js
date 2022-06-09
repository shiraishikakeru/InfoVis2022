let input_data;
let scatter_plot;
let bar_chart;
let filter = [];

d3.csv("https://shiraishikakeru.github.io/InfoVis2022/FinalTask/data_final.csv")
    .then( data => {
        input_data = data;
        input_data.forEach( d => {
            d.cancer = +d.cancer;
            d.smoke = +d.smoke;
        });

        const color_scale = d3.scaleOrdinal( d3.schemeCategory10 );
        color_scale.domain(['Hokkaido/Tohoku','Kanto','Chubu','Kinki','Chugoku','Shikoku','Kyusyu/Okinawa']);

        scatter_plot = new ScatterPlot( {
            parent: '#drawing_region_scatterplot',
            width: 512,
            height: 512,
            margin: {top:10, right:10, bottom:50, left:90},
            xlabel: 'Cancer mortality rate [%]',
            ylabel: 'Smoking rate [%]',
            cscale: color_scale
        }, input_data );
        scatter_plot.update();

        bar_chart = new BarChart( {
            parent: '#drawing_region_barchart',
            width: 512,
            height: 512,
            margin: {top:10, right:10, bottom:50, left:90},
            xlabel: 'Region',
            ylabel: 'Average smoking rate [%]',
            cscale: color_scale
        }, input_data );
        bar_chart.update();
    })
    .catch( error => {
        console.log( error );
    });

function Filter() {
    if ( filter.length == 0 ) {
        scatter_plot.data = input_data;
    }
    else {
        scatter_plot.data = input_data.filter( d => filter.includes( d.region ) );
    }
    scatter_plot.update();
}

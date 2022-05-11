d3.csv("https://shiraishikakeru.github.io/InfoVis2022/W04/w04_task2.csv")
    .then( data => {
        data.forEach( d => { d.w = +d.w; d.labal = +d.labal; });

        var config = {
            parent: '#drawing_region',
            width: 350,
            height: 256,
            margin: {top:50, right:10, bottom:50, left:100},
            title: 'Task1',
            xlabel: 'Xlabel',
            ylabel: 'Ylabel'
        };

        const bar_chart = new BarChart( config, data );
        bar_chart.update();
    })
    .catch( error => {
        console.log( error );
    });
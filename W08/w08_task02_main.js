d3.csv("https://shiraishikakeru.github.io/InfoVis2022/W08/w08_task02_data.csv")
    .then( data => {
        data.forEach( d => { d.x = +d.x; d.y = +d.y; });

        var config = {
            parent: '#drawing_region',
            width: 350,
            height: 256,
            margin: {top:10, right:10, bottom:10, left:20},
        };

        const bar_chart = new BarChart( config, data );
        bar_chart.update();
    })
    .catch( error => {
        console.log( error );
    });

class BarChart {

    constructor( config, data ) {
        this.config = {
            parent: config.parent,
            width: config.width || 350,
            height: config.height || 256,
            margin: config.margin || {top:50, right:10, bottom:50, left:100},
        }
        this.data = data;
        this.init();
    }
    
    init() {
        let self = this;
    
        self.svg = d3.select( self.config.parent )
            .attr('width', self.config.width)
            .attr('height', self.config.height);
    
        self.chart = self.svg.append('g')
            .attr('transform', `translate(${self.config.margin.left}, ${self.config.margin.top})`);
    
        self.inner_width = self.config.width - self.config.margin.left - self.config.margin.right;
        self.inner_height = self.config.height - self.config.margin.top - self.config.margin.bottom;
    
        // Initialize axis scales
        self.xscale = d3.scaleLinear()
            .range( [0, self.inner_width] );
    
        self.yscale = d3.scaleBand()
            .range( [0, self.inner_height] );
    
        // Initialize axis
        self.xaxis = d3.axisBottom( self.xscale )
            .ticks(5)
            .tickSizeOuter(0);
    
        self.yaxis = d3.axisLeft( self.yscale )
            .tickSizeOuter(0);
    
        // Draw the axis
        self.xaxis_group = self.chart.append('g')
            .attr('transform', `translate(0, ${self.inner_height})`);
    
        self.yaxis_group = self.chart.append('g');
    
    
    }
    
    update() {
        let self = this;
    
        const space = 10;
        const xmin = d3.min( self.data, d => d.w ) - space;
        const xmax = d3.max( self.data, d => d.w ) + space;
        self.xscale.domain([0, xmax]);
    
        const ymin = d3.min( self.data, d => d.y ) - space;
        const ymax = d3.max( self.data, d => d.y ) + space;
        self.yscale.domain(self.data.map(d => d.label)).paddingInner(0.1);
    
        self.render();
    }
    
    render() {
        let self = this;
    
        self.chart.selectAll("rect")
            .data(self.data)
            .enter()
            .append("rect")
            .attr("x", 0)
            .attr("y", d => self.yscale( d.label ) )
            .attr("width", d => self.xscale(d.w))
            .attr("height", self.yscale.bandwidth())
    
        self.xaxis_group
            .call( self.xaxis );
    
        self.yaxis_group
            .call( self.yaxis );
    }
}
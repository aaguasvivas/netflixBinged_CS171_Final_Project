class Tooltip {

    constructor(tooltipId, width) {
        this.tooltipId = tooltipId;
        this.width = width;

        this.createTooltip();
    }

    createTooltip() {

        let vis = this;

        vis.tt = d3.select('body')
            .append('div')
            .attr('class', 'tooltip')
            .attr('id', vis.tooltipId)
            .style('pointer-events', 'none');

        // Set a width if it is provided.
        if (vis.width) {
            vis.tt.style('width', vis.width);
        }

        // Initially it is hidden.
        vis.hideTooltip();

    }

    showTooltip(text, event) {

        let vis = this;

        vis.tt.style('opacity', 1.0)
            .html(text);

        vis.updatePosition(event);
    }

    /*
     * Hide the tooltip div.
     */
    hideTooltip() {

        let vis = this;

        vis.tt.style('opacity', 0.0);
    }

    updatePosition(event) {
        let vis = this;

        // console.log(event)

        vis.xOffset = 20;
        vis.yOffset = 10;

        vis.ttw = vis.tt.style('width');
        vis.tth = vis.tt.style('height');

        console.log(event.pageX)
        console.log(event.pageY)

        vis.tt
            .style('top', event.pageY + 'px')
            .style('left', event.pageX + 'px');
    }

}
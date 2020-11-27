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

        vis.wscrY = window.scrollY;
        vis.wscrX = window.scrollX;

        vis.curX = (document.all) ? event.clientX + vis.wscrX : event.pageX;
        vis.curY = (document.all) ? event.clientY + vis.wscrY : event.pageY;
        vis.ttleft = ((vis.curX - vis.wscrX + vis.xOffset * 2 + vis.ttw) > window.innerWidth) ?
            vis.curX - vis.ttw - vis.xOffset * 2 : vis.curX + vis.xOffset;

        if (vis.ttleft < vis.wscrX + vis.xOffset) {
            vis.ttleft = vis.wscrX + vis.xOffset;
        }

        vis.tttop = ((vis.curY - vis.wscrY + vis.yOffset * 2 + vis.tth) > window.innerHeight) ?
            vis.curY - vis.tth - vis.yOffset * 2 : vis.curY + vis.yOffset;

        if (vis.tttop < vis.wscrY + vis.yOffset) {
            vis.tttop = vis.curY + vis.yOffset;
        }

        vis.tt
            .style('top', vis.tttop + 'px')
            .style('left', vis.ttleft + 'px');
    }

}
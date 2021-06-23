import { select } from "d3-selection"
import { scaleLinear } from "d3-scale"
import { brushX } from "d3-brush"
import { axisBottom } from "d3-axis"
import { useEffect, useRef } from "react"

const Brush = ({ changeBrush = () => {}, size = [500, 50] }) => {
  const node = useRef()

  useEffect(() => {
    const svg = node.current
    const [xSize] = size

    const scale = scaleLinear().domain([0, 36]).range([0, xSize])

    const brushed = (event) => {
      const selectedExtent = event.selection.map((d) => scale.invert(d))
      changeBrush(selectedExtent)
    }

    const dayBrush = brushX()
      .extent([[0, 0], size])
      .on("brush", brushed)

    const dayAxis = axisBottom().scale(scale)

    select(svg)
      .selectAll("g.brushaxis")
      .data([0])
      .enter()
      .append("g")
      .attr("class", "brushaxis")
      .attr("transform", "translate(0,25)")

    select(svg).select("g.brushaxis").call(dayAxis)

    select(svg)
      .selectAll("g.brush")
      .data([0])
      .enter()
      .append("g")
      .attr("class", "brush")
      .attr("transform", "translate(0,0)")

    select(svg).select("g.brush").call(dayBrush)

    select(svg)
      .select("g.brush")
      .selectAll("g.resize")
      .selectAll("circle")
      .data([0])
      .enter()
      .append("circle")
      .attr("r", 25)
      .attr("cy", 25)
      .style("fill", "white")
      .style("stroke", "black")
      .style("stroke-width", "4px")
      .style("opacity", 0.75)
  })

  return <svg ref={(ref) => (node.current = ref)} width={500} height={50}></svg>
}

export default Brush

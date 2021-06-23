import { useRef, useEffect } from "react"
import { max, sum } from "d3-array"
import { scaleLinear } from "d3-scale"
import { select } from "d3-selection"
import { legendColor } from "d3-svg-legend"

import styled from "styled-components"

const Svg = styled.svg`
  border: 1px solid black;
  padding: 5px;
`

const BarChart = ({
  data,
  size: [xSize, ySize],
  colorScale,
  hover,
  setHover,
}) => {
  const node = useRef()

  useEffect(() => {
    const svg = node.current
    const dataMax = max(data.map((d) => sum(d.data)))
    const barWidth = xSize / data.length

    const legend = legendColor()
      .scale(colorScale)
      .labels(["Wave 1", "Wave 2", "Wave 3", "Wave 4"])

    select(svg)
      .selectAll("g.legend")
      .data([0])
      .enter()
      .append("g")
      .attr("class", "legend")
      .call(legend)

    select(svg)
      .select("g.legend")
      .attr("transform", "translate(" + (xSize - 100) + ", 20)")

    const yScale = scaleLinear().domain([0, dataMax]).range([0, ySize])

    select(svg)
      .selectAll("rect.bar")
      .data(data)
      .enter()
      .append("rect")
      .attr("class", "bar")
      .on("mouseover", setHover)

    select(svg).selectAll("rect.bar").data(data).exit().remove()

    select(svg)
      .selectAll("rect.bar")
      .data(data)
      .attr("x", (_, i) => i * barWidth)
      .attr("y", (d) => ySize - yScale(sum(d.data)))
      .attr("height", (d) => yScale(sum(d.data)))
      .attr("width", barWidth)
      .style("fill", (d) =>
        hover === d.id ? "#FCBC34" : colorScale(d.launchDay)
      )
      .style("stroke", "black")
      .style("stroke-opacity", 0.25)
  }, [data, xSize, ySize, hover])

  return (
    <>
      <div>Bar Chart</div>
      <Svg ref={(ref) => (node.current = ref)} width={xSize} height={ySize} />
    </>
  )
}

export default BarChart

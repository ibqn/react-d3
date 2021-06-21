import { useRef, useEffect } from "react"
import { max } from "d3-array"
import { scaleLinear } from "d3-scale"
import { select } from "d3-selection"
import styled from "styled-components"

const Svg = styled.svg`
  border: 1px solid black;
  padding: 5px;
`

const BarChart = ({ data, size: [xSize, ySize] }) => {
  const node = useRef()

  useEffect(() => {
    const dataMax = max(data)
    const yScale = scaleLinear().domain([0, dataMax]).range([0, ySize])
    const barWidth = 25

    // console.log(node)

    select(node.current).selectAll("rect").data(data).enter().append("rect")

    select(node.current).selectAll("rect").data(data).exit().remove()

    select(node.current)
      .selectAll("rect")
      .data(data)
      .style("fill", "#fe9922")
      .attr("x", (d, i) => i * (barWidth + 1))
      .attr("y", (d) => ySize - yScale(d))
      .attr("height", (d) => yScale(d))
      .attr("width", barWidth)
  }, [data, xSize, ySize])

  return (
    <>
      <div>Bar Chart</div>
      <Svg ref={(ref) => (node.current = ref)} width={xSize} height={ySize} />
    </>
  )
}

export default BarChart

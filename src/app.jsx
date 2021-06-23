import { useMemo, useState } from "react"
import Brush from "./components/brush"
import BarChart from "./components/bar-chart"
import styled from "styled-components"

import worldData from "./data/world.json"
import { geoCentroid } from "d3-geo"
import { range } from "d3-array"
import { scaleThreshold } from "d3-scale"
import WorldMap from "./components/world-map"

const appData = worldData.features.filter((d) => geoCentroid(d)[0] < -20)

appData.forEach((d, i) => {
  const offset = Math.random()
  d.launchDay = i
  d.data = range(30).map((_, q) => (q < i ? 0 : Math.random() * 2 + offset))
})

const colorScale = scaleThreshold()
  .domain([5, 10, 20, 30])
  .range(["#75739F", "#5EAFC6", "#41A368", "#93C464"])

const Main = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
`

const dataSize = 20

const App = () => {
  const [hover, setHover] = useState(null)
  const [brushExtent, setBrushExtent] = useState([0, 40])

  const filteredAppData = useMemo(
    () =>
      appData.filter(
        (d, i) => d.launchDay >= brushExtent[0] && d.launchDay <= brushExtent[1]
      ),
    [brushExtent]
  )

  return (
    <Main>
      <h2>D3 chart example</h2>
      <WorldMap
        hover={hover}
        setHover={setHover}
        data={filteredAppData}
        colorScale={colorScale}
      />
      <Brush changeBrush={setBrushExtent} />
      <BarChart
        hover={hover}
        setHover={setHover}
        colorScale={colorScale}
        data={filteredAppData}
        size={[500, 500]}
      />
    </Main>
  )
}

export default App

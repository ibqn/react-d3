import { geoMercator, geoPath } from "d3-geo"
import { useMemo } from "react"

const projection = geoMercator().scale(120).translate([430, 350])

const pathGenerator = geoPath().projection(projection)

const WorldMap = ({ data, hover, setHover, colorScale }) => {
  const countries = useMemo(
    () =>
      data.map((d) => (
        <path
          key={`path-${d.id}`}
          d={pathGenerator(d)}
          onMouseEnter={() => setHover(d.id)}
          style={{
            fill: hover === d.id ? "#FCBC34" : colorScale(d.launchDay),
            stroke: "black",
            strokeOpacity: 0.5,
          }}
          className="countries"
        />
      )),
    [data, hover, setHover, colorScale]
  )

  return (
    <svg width={500} height={500}>
      {countries}
    </svg>
  )
}

export default WorldMap

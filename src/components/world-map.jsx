import { geoMercator, geoPath } from "d3-geo"
import { useMemo } from "react"

const projection = geoMercator().scale(120).translate([430, 350])

const pathGenerator = geoPath().projection(projection)

const WorldMap = ({ data }) => {
  const countries = useMemo(
    () =>
      data.map((d, i) => (
        <path
          key={`path-${i}`}
          d={pathGenerator(d)}
          style={{
            fill: "#FCBC34",
            stroke: "black",
            strokeOpacity: 0.5,
          }}
          className="countries"
        />
      )),
    [data]
  )

  return (
    <svg width={500} height={500}>
      {countries}
    </svg>
  )
}

export default WorldMap

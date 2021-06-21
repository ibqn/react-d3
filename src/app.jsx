import BarChart from "./components/bar-chart"
import styled from "styled-components"

const Main = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
`

const dataSize = 20
const data = Array.from({ length: dataSize }, () => Math.random() * 30)

const App = () => {
  return (
    <Main>
      <h2>D3 chart Example</h2>
      <BarChart data={data} size={[26 * dataSize, 500]} />
    </Main>
  )
}

export default App

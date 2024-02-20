
import './App.css'
import Currency from './components/currencyconverter'

function App() {


  return (
    <div className="App flex justify-center items-center bg-green-200 rounded-md  h-screen">
      <div className="heading text-center  flex justify-center items-center mt-10 rounded-md">

        <Currency/>
      </div>

    </div>
  )
}

export default App

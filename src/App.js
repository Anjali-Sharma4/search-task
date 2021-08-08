//import React, { Component } from 'react';
//import SearchFilter from './SearchFilter';
//import "./App.css";
//
//class App extends Component {
//  render() {
//    return <SearchFilter />
//  }
//}
//
//export default App;
import React,{useEffect,useState} from 'react'

const jsondata = require('./JsonFile/react-test-data.json')

function App() {
const [data,setData] = useState([])
const [search, setSearch] = useState("");
const [filteredData, setFilteredData] = useState([]);
//const [rating,setRating] = useState();
const [filteredRating,setFilteredRating] = useState([]);


    useEffect(() => {
        console.log("data :",jsondata,'hi')
        setData(jsondata)
        setFilteredRating([...new Set(jsondata.map(item => item.Rating))])
    },[])

    useEffect(() => {
    console.log("in useeee")
    setFilteredData(
      data.filter((d) =>
        d.Name.toLowerCase().includes(search.toLowerCase()) ||
        d.City.toLowerCase().includes(search.toLowerCase()) ||
          d['Cuisine Style'].toLowerCase().includes(search.toLowerCase()) ||
          d['Rating'].toString() === search


      )
    );
  }, [search, data ]);


    const handleRating = (e) => {
         setFilteredData(
      data.filter((d) =>

          d.Rating === parseInt(e.target.value)


      )
    );
    }


  return (
      <React.Fragment>

          <div className="container">
            <input type="text" name="dataSearch" onChange={(e) => {setSearch(e.target.value)}} placeholder="Name,City & Cuisine Style,"/>
             <select name="rating" onChange={handleRating}>
                 <option>Select Rating</option>
                 {
                    filteredRating.sort((a,b) => a > b ? 1 : -1).map((rating,i) =>
                         (<option key={i} value={rating}>{rating}</option>)
                    )
                 }
             </select>
          </div>

        <div className="container table-responsive py-5">
        <table className="table table-bordered table-hover">
              <thead className="thead-dark">
                <tr>
                  <th scope="col">Name</th>
                  <th scope="col">City</th>
                  <th scope="col">Cuisine Style</th>
                  <th scope="col">Ranking</th>
                  <th scope="col">Rating</th>
                  <th scope="col">No. Of Reviews</th>
                </tr>
              </thead>
              <tbody>
              {filteredData.map((d,index) =>{
                const cusine_style = d['Cuisine Style']
                const r = cusine_style.slice(1,-1)

                return(
                <tr key={index}>
                  <td>{d.Name}</td>
                  <td>{d.City}</td>
                  <td>{cusine_style}
                 {/*{r.map((style) =>{
                    return(<p>{style}</p>)

                  })}*/}
                  </td>
                  <td>{d.Ranking}</td>
                  <td>{d.Rating}</td>
                  <td>{d['Number of Reviews']}</td>
                </tr>)})}

              </tbody>
            </table>
            </div>

      </React.Fragment>

  );
}

export default App;

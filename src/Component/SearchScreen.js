import React,{useEffect,useState} from 'react'

import jsondata from "../JsonFile/react-test-data.json";

function SearchScreen() {
const [data,setData] = useState([])
const [search, setSearch] = useState("");
const [filteredData, setFilteredData] = useState([]);
const [filteredRating,setFilteredRating] = useState([]);


    useEffect(() => {
        console.log("data :",jsondata,'hi')
        setData(jsondata)
        setFilteredRating([...new Set(jsondata.map(item => item.Rating))])
    },[])

    useEffect(() => {
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
        let trial = [...filteredData]
         setFilteredData(
          trial.filter((d) =>
              d.Rating === parseInt(e.target.value)
          )
    );
    }

  return (
      <React.Fragment>
          <div className="container">
              <div className="row">
                <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12 pt-5">
                    <input type="text" name="dataSearch" onChange={(e) => {setSearch(e.target.value)}} placeholder="Name,City & Cuisine Style,"/>
                </div>
                <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12 pt-5">
                     <select name="rating" onChange={handleRating}>
                         <option> Search By  Rating</option>
                         {
                            filteredRating.sort((a,b) => a > b ? 1 : -1).map((rating,i) =>
                                 (<option key={i} value={rating}>{rating}</option>)
                            )
                         }
                     </select>
                </div>

                <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 ">
                    <div className="table-responsive py-5">
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
                            let cuisines = d["Cuisine Style"]
                              .substring(1, d["Cuisine Style"].length - 2)
                              .split(",");


                            return(
                            <tr key={index}>
                              <td>{d.Name}</td>
                              <td>{d.City}</td>
                              <td>
                                    {cuisines.map(cuisine => {
                                      let cuisineToShow = cuisine.substring(
                                        1,
                                        cuisine.length - 1
                                      );
                                      cuisineToShow = cuisineToShow.includes("'")
                                        ? cuisineToShow.substring(1, cuisineToShow.length)
                                        : cuisineToShow;
                                      return (
                                        <div>
                                          {cuisineToShow}
                                        </div>
                                      );
                                    })}
                              </td>
                              <td>{d.Ranking}</td>
                              <td>{d.Rating}</td>
                              <td>{d['Number of Reviews']}</td>
                            </tr>)})}

                          </tbody>
                        </table>
                    </div>
                </div>
              </div>
          </div>
      </React.Fragment>
  );
}

export default SearchScreen;

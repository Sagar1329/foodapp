import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import Card from '../components/Card'

function Home() {
    const  [search,setSearch]=useState('')
    const [foodCat, setFoodCat] = useState([])
    const [foodItem, setFoodItem] = useState([])
    const loadData = async () => {
        let response = await fetch("http://localhost:5000/api/foodData", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            }
        });

        response = await response.json()
        setFoodItem(response[0])
        setFoodCat(response[1])
        // console.log(response[0],response[1])
    }
    useEffect(() => {
        loadData()
    }, [])
    return (
        <div>
            <div>
                <Navbar></Navbar>
            </div>
            <div>
            <div id="carouselExampleFade" className="carousel slide carousel-fade" data-bs-ride="carousel">
                <div className="carousel-inner" id="carousel">
                    <div className="carousel-caption">
                      <div className='d-flex justify-content center'>
                      <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search"  value={search} 
                      onChange={(e)=>{setSearch(e.target.value)}}/>
                            {/* <button className="btn btn-outline-success" type="submit">Search</button> */}
                      </div>
                      
                       

                    </div>
                    <div className="carousel-item active">
                        <img id="caroselimg" src="https://images.unsplash.com/photo-1577154879758-6892cd7e8e87?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxleHBsb3JlLWZlZWR8NHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=60" className="d-block w-100" alt="..." />
                    </div>
                    <div className="carousel-item">
                        <img id="caroselimg" src="https://images.unsplash.com/photo-1542887800-faca0261c9e1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxleHBsb3JlLWZlZWR8OHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=60" className="d-block w-100" alt="..." />
                    </div>
                    <div className="carousel-item">
                        <img id="caroselimg" src="https://images.unsplash.com/photo-1476370648495-3533f64427a2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxleHBsb3JlLWZlZWR8N3x8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=60" className="d-block w-100" alt="..." />
                    </div>
                </div>
                <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="prev">
                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Previous</span>
                </button>
                <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="next">
                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Next</span>
                </button>
            </div>
            </div>
            <div className='container'>
                {
                    foodCat != [] ? foodCat.map((data) => {
                        return (
                            <div className='row mb-3'>
                                <div key={ data._id } className='fs-3 m-3'> { data.CategoryName }</div>
                                <hr />
                                {
                                    foodItem != [] ? 
                                    foodItem.filter((item)=>(item.CategoryName==data.CategoryName)  &&(item.name.toLowerCase().includes(search))) 
                                  
                                    .map(filterItems=>{
                                        return (
                                            <div key={filterItems._id} className='col-12 col-md-6 col-lg-3'>
                                                <Card
                                                foodItem={filterItems}
                                                options={filterItems.options[0]}
                                                
                                                />
                                            </div>
                                        )
                                    })
                                    :
                                    
                                    
                                    
                                    <div>"NO SUCH DATA"</div>
                                }
                            </div>
                        )
                    }) : <div>Fuck all</div>

                }
             
            </div>
            <div>< Footer /></div>
        </div>
    )
}

export default Home
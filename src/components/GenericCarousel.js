import React, { Component } from 'react';

import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';
import axios from 'axios';



 
export default class GenericCarousel extends Component {
    state={images:[]}
    

    componentDidMount(){
        
        axios.get('https://api.unsplash.com/search/photos',{
          params:{query:'flowers'},
          headers:{
            Authorization: 'Client-ID aac5cf9232e4eb81e35695546c92c490374f3f8087fd7b019c3c5fa32de537f6'
          }
      
        }).then((response)=>{

            this.setState({images:response.data.results})
            
            //console.log(response.data.results) 
        })
      }
    render() {
        if(this.state.images.length>0){
            return (
                <Carousel showArrows={true} >
                    {
                            this.state.images.map(image=>{
                              return (
                                  <div key={image.id}>
                                        <img src={image.urls.regular}  alt={image.description}/>
                                        <p className="legend">{ image.description }</p>
                                  </div>
                                
                              )  
                            }) 
                    }
                </Carousel>
            );
        }
        else{
            return <div>Loading..</div>
        }

       
    }
};
 


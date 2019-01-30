import React, { Component } from 'react';

import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';
//import {isMobile} from 'react-device-detect';
import axios from 'axios';



 
export default class GenericCarousel extends Component {

    constructor(props) {
        super(props)
    
        this.state={
            images:[],
            currentIndex: 0,
            width: window.innerWidth
        }
      }
    
      goToPrevSlide(e) {
        e.preventDefault();
    
        let index = this.state.currentIndex;
        let { images } = this.state;
        let slidesLength = images.length;
    
        if (index < 1) {
          index = slidesLength;
        }
    
        --index;
    
        this.setState({
            currentIndex: index
        });
      }
  
      goToNextSlide(e) {
        e.preventDefault();
    
        let index = this.state.currentIndex;
        let { images } = this.state;
        let slidesLength = images.length - 1;
    
        if (index === slidesLength) {
          index = -1;
        }
    
        ++index;
    
        this.setState({
            currentIndex: index
        });
      }


      componentWillMount() {
        window.addEventListener('resize', this.handleWindowSizeChange);
      }
      
      // make sure to remove the listener
      // when the component is not mounted anymore
      componentWillUnmount() {
        window.removeEventListener('resize', this.handleWindowSizeChange);
      }
      
      handleWindowSizeChange = () => {
        this.setState({ width: window.innerWidth });
      };



    componentDidMount(){
        //Get the images from the API
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

      renderContent = () => {
        const { width } = this.state;
        const isMobile = width <= 500;
        if (!isMobile) {
            return (
                <div>
                    <div className="card"> 
                            <div className="content">
                                <div className="header">
                                    Carousel Test
                                </div>
                                <Carousel selectedItem={this.state.currentIndex} >
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
                        </div>
                    </div>
                    
                        <div className="card">
                            <div className="extra content">
                                <div className="ui two buttons">
                                    <div className="ui primary button"  onClick={e => this.goToPrevSlide(e)}>Prev</div>
                                    <div className="ui primary button" onClick={e => this.goToNextSlide(e)}>Next</div>
                                </div>

                            </div>
                        </div>
                                      
                </div>
                
                

            );
        }
        return (
            <div>
                <div className="card"> 
                        <div className="content">
                            <div className="header">
                                Carousel Test
                            </div>
                            <Carousel selectedItem={this.state.currentIndex} >
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
                    </div>
                </div>
                
                                 
            </div>
            
            

        );
    }


    render() {
        if(this.state.images.length>0){
          return  this.renderContent();
        }
        
            return <div>Loading..</div>

    }
};
 


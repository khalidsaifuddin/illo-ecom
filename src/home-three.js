import React from 'react';
import Navbar from './components/navbar';
import About from './components/about';
import Feature from './components/feature';
import ScreenShot from './components/screenshot';
import Team from './components/team';
import Blog from './components/blog';
import Price from './components/price';
import Testimonial from './components/testimonial';
import Contact from './components/contact';
import Subscribe from './components/subscribe';
import Footer from './components/footer';
import ModalVideo from 'react-modal-video';
import Tilt from 'react-tilt';
import 'react-modal-video/scss/modal-video.scss';

import {withRouter} from 'react-router';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as Actions from './store/actions';

// import "~react-image-gallery/styles/scss/image-gallery.scss";
// import "~react-image-gallery/styles/css/image-gallery.css";

import ImageGallery from 'react-image-gallery';

class HomeThree extends React.Component {

	// constructor () {
	//     super()
	//     this.state = {
	//       isOpen: false
	//     }
	//     this.openModal = this.openModal.bind(this)
	// }

	state = {
		isOpen: false,
		routeParams: {}
	}

	images = [
		{
		  original: 'https://images.unsplash.com/photo-1531895861208-8504b98fe814?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1650&q=80',
		  thumbnail: 'https://images.unsplash.com/photo-1531895861208-8504b98fe814?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1650&q=80',
		},
		{
		  original: 'https://images.unsplash.com/photo-1614588522761-c28918c00d05?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1652&q=80',
		  thumbnail: 'https://images.unsplash.com/photo-1614588522761-c28918c00d05?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1652&q=80',
		},
		{
		  original: 'https://images.unsplash.com/photo-1601049676869-702ea24cfd58?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1652&q=80',
		  thumbnail: 'https://images.unsplash.com/photo-1601049676869-702ea24cfd58?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1652&q=80',
		},
	]

	openModal () {
	    // this.setState({isOpen: true})
	}

	componentDidMount() {

		this.props.getPengguna(this.state.routeParams)
		
        setTimeout(function() {
            document.querySelector(".loader-wrapper").style = "display: none";
        }, 2000);
	}
	
  render() {
  	document.body.classList.remove('landing-page');
	document.body.classList.remove('home-style-two');
  	document.body.classList.add('home-style');
  	document.body.classList.add('three');
  	return (
  		<div>
  			{/* Navbar Component*/}
  			<Navbar />

  			{/* Home Two Section Start */}
  			<section id="home" className="home home-three vertical-scrolling">
			  	<div className="home-decor">
					<div className="home-circle1"><img src="assets/images/main-banner3.png" alt="" /></div>
					<div className="home-circle2"><img src="assets/images/main-banner12.png" alt="" /></div>
					<div className="home-circle3"><img src="assets/images/main-banner1.png" alt="" /></div>
				</div>
			   	<div className="container">
			      <div className="row">
			         <div className="col-md-12 col-sm-12">
						<div style={{minHeight:'36px'}}></div>
						<ImageGallery 
							items={this.images} 
							className="galeriBesar" 
							showThumbnails={false}
							showFullscreenButton={false}
							autoPlay={true}
						/>
			            {/* <div className="home-contain"> */}
			               {/* <div className="text-white">
			                  <div className="contain">
			                  <h4>Aplikasi</h4>
			                  <img src="assets/images/diskuis_white.png" style={{width:'300px'}} />
			                  <p className="slide-cap-desc">Pembelajaran <i>Online</i>/Daring kolaboratif yang seru & menyenangkan untuk semua, dalam satu aplikasi!</p>
			                  <a target="_blank" href={"https://play.google.com/store/apps/details?id=io.timkayu.diskuisapp&hl=en&gl=US"}><img className="ml-10 store" style={{width:'200px'}} src="https://play.google.com/intl/en_us/badges/static/images/badges/en_badge_web_generic.png" alt="play-store" /></a>
			                  </div>
			                  <div className="play-button">
			                  	<ModalVideo channel='vimeo' isOpen={this.state.isOpen} videoId='54298665' height={600} width={800} onClose={() => this.setState({isOpen: false})} />
			                  	<a className="animated-circle" href="https://app.diskuis.id" target="_blank">
			                     	<img src="assets/images/home2/play-buttons.png" alt="play-button" onClick={this.openModal} className="img-fluid" />
								</a>
			                  </div>
			               </div> */}
			            {/* </div> */}
			         </div>
			         <div className="col-sm-7">
			            {/* <div className="home-right">
			            	<Tilt options={{ perspective: 110, speed: 400, max: 1.2, scale:1 }}>
			               		<img src="assets/images/mobile.png" className="img-fluid" alt="slider-caption" style={{marginTop:'-100px', width:'90%'}} />
			               	</Tilt>
			            </div> */}
			         </div>
			      </div>
			   </div>
			</section>
			{/* Home Two Section End */}

			{/* About Component*/}
			{/* <About /> */}

			{/*Feature Component*/}
			{/* <Feature /> */}

			{/*ScreenShot Component*/}
			{/* <ScreenShot /> */}

			{/*Team Component*/}
			{/* <Team /> */}

			{/*Blog Component*/}
			{/* <Blog /> */}

			{/*Price Component*/}
			{/* <Price /> */}
			
			{/*Testimonial Component*/}
			{/* <Testimonial /> */}
			
			{/*Contact Component*/}
			{/* <Contact /> */}

			{/*Subscription Component*/}
			{/* <Subscribe /> */}

			{/*Footer Component*/}
			{/* <Footer /> */}
  		</div>
  	);
  }
}


function mapDispatchToProps(dispatch) {
    return bindActionCreators({
		getArtikel: Actions.getArtikel,
		getPengguna: Actions.getPengguna
    }, dispatch);
}

export default (connect(null, mapDispatchToProps)(HomeThree));

// export default HomeThree;
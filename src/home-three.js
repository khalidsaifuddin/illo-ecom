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
		routeParams: {},
		produk: {
			rows: [],
			total: 0
		}
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
		this.props.getProduk(this.state.routeParams).then((result)=>{
			this.setState({
				produk: result.payload
			})
		})
		
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
  			<section id="home" className="home home-three vertical-scrolling" style={{marginBottom:'0px'}}>
			  	<div className="home-decor">
					<div className="home-circle1"><img src="assets/images/main-banner3.png" alt="" /></div>
					<div className="home-circle2"><img src="assets/images/main-banner12.png" alt="" /></div>
					<div className="home-circle3"><img src="assets/images/main-banner1.png" alt="" /></div>
				</div>
			   	<div className="container">
			      <div className="row">
			         <div className="col-md-12 col-sm-12">
						<div style={{minHeight:'8px'}}></div>
						<ImageGallery 
							items={this.images} 
							className="galeriBesar" 
							showThumbnails={false}
							showFullscreenButton={false}
							autoPlay={true}
						/>
			         </div>
			      </div>
			   </div>
			</section>
			<section id="produk_rekomendasi" style={{marginTop:'-300px', backgroundColor:'white'}}>
				<div className="container">
					<div className="row">
						<div className="col-md-6 col-sm-6 col-text-center d-align-center" style={{borderBottom:'5px solid #ccc', paddingBottom:'0px', height:'45px'}}>
							<h2 className="title">
								<span style={{fontSize:'20px'}}>Rekomendasi Untuk Anda</span>
							</h2>
						</div>
						<div className="col-md-12 col-sm-12" style={{display:'inline-flex', overflow:'auto', marginTop:'8px', paddingBottom:'16px'}}>
							{this.state.produk.rows.map((option)=>{
								return (
									<div className="card" style={{
										minWidth:'256px', 
										height:'365px', 
										marginRight:'16px', 
										borderRadius:'20px',
										boxShadow: '0 4px 8px 0 rgba(0,0,0,0.2)',
										transition: '0.3s',
										border: '0px solid #ccc'
									}}>
										{/* {option.nama} */}
										{option.gambar_produk && option.gambar_produk.length > 0 &&
										<div
											style={{
												width:'100%',
												height:'240px',
												backgroundImage: 'url('+localStorage.getItem('api_base')+option.gambar_produk[0].nama_file+')',
												backgroundRepeat:'no-repeat',
												backgroundSize: 'cover',
												backgroundPosition:'center',
												borderRadius:'20px 20px 0px 0px'
											}}
										>&nbsp;</div>
										}
										<div style={{margin:'8px', maxHeight:'30px', overflow:'hidden', textOverflow:'ellipsis', flexFlow:'nowrap', width:'100%'}}>
											<h3 className="title" style={{marginTop:'0px'}}>{option.nama}</h3>
										</div>
										<div style={{paddingTop:'0px', margin:'8px', maxHeight:'50px', overflow:'hidden', textOverflow:'ellipsis', flexFlow:'nowrap', marginTop:'-8px'}}>
											{option.keterangan &&
											<div className="boxKeterangan" style={{marginTop:'0px', fontSize:'10px'}} dangerouslySetInnerHTML={{ __html: option.keterangan.replace(/noreferrer/g, 'noreferrer" class="link external"').replace('<p class=""><br></p>','').replace(/(<([^>]+)>)/gi, "").substring(0,100) }} />
											}
										</div>
									</div>
								)
							})}
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
			<Footer />
  		</div>
  	);
  }
}


function mapDispatchToProps(dispatch) {
    return bindActionCreators({
		getArtikel: Actions.getArtikel,
		getPengguna: Actions.getPengguna,
		getProduk: Actions.getProduk
    }, dispatch);
}

export default (connect(null, mapDispatchToProps)(HomeThree));

// export default HomeThree;
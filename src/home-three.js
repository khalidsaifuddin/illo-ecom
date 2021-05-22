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
import CardProduk from './components/CardProduk';

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
		routeParams: {
			a_random: 'Y',
			limit: 5
		},
		produk: {
			rows: [],
			total: 0
		},
		produk_best_seller: {
			rows: [],
			total: 0
		},
		kategori_produk: {
			rows: [],
			total: 0
		},
		routeParams: (parseInt(localStorage.getItem('sudah_login')) === 1 ? JSON.parse(localStorage.getItem('user')) : {}),
		mitra_terdekat: [],
		images_samping: [],
		images_bawah: [],
		images: [
			// {
			//   original: 'https://images.unsplash.com/photo-1531895861208-8504b98fe814?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1650&q=80',
			//   thumbnail: 'https://images.unsplash.com/photo-1531895861208-8504b98fe814?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1650&q=80',
			// },
			// {
			//   original: 'https://images.unsplash.com/photo-1614588522761-c28918c00d05?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1652&q=80',
			//   thumbnail: 'https://images.unsplash.com/photo-1614588522761-c28918c00d05?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1652&q=80',
			// },
			// {
			//   original: 'https://images.unsplash.com/photo-1601049676869-702ea24cfd58?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1652&q=80',
			//   thumbnail: 'https://images.unsplash.com/photo-1601049676869-702ea24cfd58?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1652&q=80',
			// },
			// {
			//   original: 'https://images.unsplash.com/photo-1505944270255-72b8c68c6a70?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1650&q=80',
			//   thumbnail: 'https://images.unsplash.com/photo-1505944270255-72b8c68c6a70?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1650&q=80',
			// },
			// {
			//   original: 'https://images.unsplash.com/photo-1566814534947-46a09bcbb88c?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1519&q=80',
			//   thumbnail: 'https://images.unsplash.com/photo-1566814534947-46a09bcbb88c?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1519&q=80',
			// },
		]
	}

	gradients = [
		'linear-gradient(to top, #a18cd1 0%, #fbc2eb 100%)',
		'linear-gradient(to right, #ff8177 0%, #ff867a 0%, #ff8c7f 21%, #f99185 52%, #cf556c 78%, #b12a5b 100%)',
		'linear-gradient(120deg, #a6c0fe 0%, #f68084 100%)',
		'linear-gradient(to right, #4facfe 0%, #00f2fe 100%)',
		'linear-gradient(to top, #d299c2 0%, #fef9d7 100%)',
		'linear-gradient(120deg, #89f7fe 0%, #66a6ff 100%)',
		'linear-gradient(to right, #6a11cb 0%, #2575fc 100%)',
		'linear-gradient(to right, #b8cbb8 0%, #b8cbb8 0%, #b465da 0%, #cf6cc9 33%, #ee609c 66%, #ee609c 100%)'
	]

	// images = [
	// 	{
	// 	  original: 'https://images.unsplash.com/photo-1531895861208-8504b98fe814?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1650&q=80',
	// 	  thumbnail: 'https://images.unsplash.com/photo-1531895861208-8504b98fe814?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1650&q=80',
	// 	},
	// 	{
	// 	  original: 'https://images.unsplash.com/photo-1614588522761-c28918c00d05?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1652&q=80',
	// 	  thumbnail: 'https://images.unsplash.com/photo-1614588522761-c28918c00d05?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1652&q=80',
	// 	},
	// 	{
	// 	  original: 'https://images.unsplash.com/photo-1601049676869-702ea24cfd58?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1652&q=80',
	// 	  thumbnail: 'https://images.unsplash.com/photo-1601049676869-702ea24cfd58?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1652&q=80',
	// 	},
	// 	{
	// 	  original: 'https://images.unsplash.com/photo-1505944270255-72b8c68c6a70?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1650&q=80',
	// 	  thumbnail: 'https://images.unsplash.com/photo-1505944270255-72b8c68c6a70?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1650&q=80',
	// 	},
	// 	{
	// 	  original: 'https://images.unsplash.com/photo-1566814534947-46a09bcbb88c?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1519&q=80',
	// 	  thumbnail: 'https://images.unsplash.com/photo-1566814534947-46a09bcbb88c?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1519&q=80',
	// 	},
	// ]

	openModal () {
	    // this.setState({isOpen: true})
	}

	componentDidMount() {

		if(parseInt(localStorage.getItem('sudah_login')) === 1){
			//sudah login
			this.props.getPengguna(this.state.routeParams).then((result)=>{
				if(result.payload.total > 0){
					//sudah login
					localStorage.setItem('user', JSON.stringify(result.payload.rows[0]))
					// console.log(localStorage.getItem('user'))
				}
			})
		}else{
			//belum login
		}

		this.props.getBanner({...this.state.routeParams, aktif: 1}).then((resultBanner)=>{

			let images = []
			let images_samping = []
			let images_bawah = []

			resultBanner.payload.rows.map((option)=>{

				if(parseInt(option.jenis_banner_id) === 1){
					let image = {
						// original: localStorage.getItem('api_base') + option.nama_file,
						// thumbnail: localStorage.getItem('api_base') + option.nama_file,
						original: localStorage.getItem('api_base_gambar') + option.nama_file,
						thumbnail: localStorage.getItem('api_base_gambar') + option.nama_file,
						...option
					}
	
					images.push(image)
				}

				if(parseInt(option.jenis_banner_id) === 2){
					let image_samping = {
						// original: localStorage.getItem('api_base') + option.nama_file,
						// thumbnail: localStorage.getItem('api_base') + option.nama_file,
						original: localStorage.getItem('api_base_gambar') + option.nama_file,
						thumbnail: localStorage.getItem('api_base_gambar') + option.nama_file,
						...option
					}
	
					images_samping.push(image_samping)
				}
				
				if(parseInt(option.jenis_banner_id) === 3){
					let image_bawah = {
						// original: localStorage.getItem('api_base') + option.nama_file,
						// thumbnail: localStorage.getItem('api_base') + option.nama_file,
						original: localStorage.getItem('api_base_gambar') + option.nama_file,
						thumbnail: localStorage.getItem('api_base_gambar') + option.nama_file,
						...option
					}
	
					images_bawah.push(image_bawah)
				}

			})

			this.setState({
				images: images,
				images_samping: images_samping,
				images_bawah: images_bawah
			},()=>{

				this.props.getProduk(this.state.routeParams).then((result)=>{
					this.setState({
						produk: result.payload
					},()=>{
						this.props.getKategoriProduk({...this.state.routeParams, limit: 20}).then((result)=>{
							this.setState({
								kategori_produk: result.payload
							},()=>{
								this.props.getProduk(this.state.routeParams).then((result)=>{
									this.setState({
										produk_best_seller: result.payload
									})
								})
							})
						})
					})
				})
		
				if(parseInt(localStorage.getItem('sudah_login')) === 1 && JSON.parse(localStorage.getItem('user')).jenis_mitra_id !== 5){
					this.props.getMitraTerdekat({
						pengguna_id: JSON.parse(localStorage.getItem('user')).pengguna_id,
						kode_wilayah_kecamatan: JSON.parse(localStorage.getItem('user')).alamat_pengguna && JSON.parse(localStorage.getItem('user')).alamat_pengguna.length > 0 ? JSON.parse(localStorage.getItem('user')).alamat_pengguna[0].kode_wilayah_kecamatan : null,
						kode_wilayah_kabupaten: JSON.parse(localStorage.getItem('user')).alamat_pengguna && JSON.parse(localStorage.getItem('user')).alamat_pengguna.length > 0 ? JSON.parse(localStorage.getItem('user')).alamat_pengguna[0].kode_wilayah_kabupaten : null,
						kode_wilayah_provinsi: JSON.parse(localStorage.getItem('user')).alamat_pengguna && JSON.parse(localStorage.getItem('user')).alamat_pengguna.length > 0 ? JSON.parse(localStorage.getItem('user')).alamat_pengguna[0].kode_wilayah_provinsi : null,
						jenis_mitra_id: JSON.parse(localStorage.getItem('user')).jenis_mitra_id
					}).then((result)=>{
						this.setState({
							mitra_terdekat: result.payload
						},()=>{
		
							if(result.payload.length > 0){
								localStorage.setItem('mitra_terdekat',JSON.stringify(result.payload[0]))
							}
		
						})
					})
				}else if(parseInt(localStorage.getItem('sudah_login')) === 1 && JSON.parse(localStorage.getItem('user')).jenis_mitra_id === 5){
					this.props.getMitraTerdekat({
						pengguna_id: JSON.parse(localStorage.getItem('user')).pengguna_id,
						kode_wilayah_kecamatan: null,
						kode_wilayah_kabupaten: null,
						kode_wilayah_provinsi: null,
						jenis_mitra_id: JSON.parse(localStorage.getItem('user')).jenis_mitra_id
					}).then((result)=>{
						this.setState({
							mitra_terdekat: result.payload
						},()=>{
		
							if(result.payload.length > 0){
								localStorage.setItem('mitra_terdekat',JSON.stringify(result.payload[0]))
							}
		
						})
					})
				}
				
				setTimeout(function() {
					document.querySelector(".loader-wrapper").style = "display: none";
				}, 2000)

			})

		})

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
				{/* <section id="home" className="home home-three vertical-scrolling" style={{marginBottom:'0px'}}> */}
				{/* <section id="home" className="home home-three vertical-scrolling">
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
				</section> */}
				{/* <section id="banner" style={{background:'linear-gradient(60deg, #96deda 0%, #50c9c3 100%)'}}> */}
				{/* <section id="banner" style={{background:'linear-gradient(60deg, #96deda 0%, #50c9c3 100%)'}}> */}
				{/* <section id="banner" style={{background:'linear-gradient(to top, #52c234, #061700)'}}> */}

				<section id="banner" className="bannerAtas">
					<div className="container" style={{paddingTop:'0px'}}>
						<div className="row">
							<div className="col-md-12 col-sm-12" style={{paddingRight:'8px', paddingLeft:'8px'}}>
							<div style={{minHeight:'8px'}}></div>
							<ImageGallery 
								items={this.state.images} 
								className="galeriBesar" 
								showThumbnails={false}
								showFullscreenButton={false}
								autoPlay={true}
							/>
							</div>
						</div>
					</div>
				</section>
				<section id="produk_rekomendasi" className="produkRekomendasi">
					<div className="container">
						<div className="row">
							<div className="col-md-3 col-sm-12" style={{paddingRight:'8px', paddingLeft:'8px'}}>
								{parseInt(localStorage.getItem('sudah_login')) !== 1 &&
								<a href="/login" style={{color:'#434343'}}>
									<div className="card card20" style={{textAlign:'center'}}>
										<div
										style={{
											width:'64px',
											height:'64px',
											background:'#434343',
											backgroundImage: 'url(/assets/images/user_avatar.jpg)',
											backgroundRepeat: 'no-repeat',
											backgroundSize:'120%',
											margin:'auto',
											marginBottom:'16px',
											marginTop:'16px',
											borderRadius:'50%',
											border:'1px solid #ccc'
										}}
										>&nbsp;</div>
										<div>
											Login/Daftar
										</div>
										<div className="card card20" style={{color:'white', fontSize:'15px', textAlign:'center', background:'linear-gradient(to right, #b8cbb8 0%, #b8cbb8 0%, #b465da 0%, #cf6cc9 33%, #ee609c 66%, #ee609c 100%)'}}>
											Daftar/Login sekarang juga dan dapatkan penawaran spesial dari Illo!
										</div>
									</div>
								</a>
								}
								{localStorage.getItem('user') !== '' && localStorage.getItem('user') != null &&
								<a href="/profil" style={{color:'#434343'}}>
									<div className="card card20" style={{textAlign:'center'}}>
										<div style={{
											width:'50px', 
											height:'50px', 
											borderRadius:'50%', 
											background:'#434343',
											backgroundImage: 'url('+(this.state.routeParams.gambar ? this.state.routeParams.gambar : '/assets/images/boy.jpg')+')',
											backgroundSize: 'cover',
											backgroundPosition: 'center',
											backgroundRepeat: 'no-repeat',
											border: '1px solid #ccc',
											margin: 'auto'
										}}>&nbsp;</div>
										<b>{JSON.parse(localStorage.getItem('user')).nama}</b>
										<span style={{fontSize:'10px'}}>{JSON.parse(localStorage.getItem('user')).username}</span>
										<span style={{fontSize:'10px'}}>{JSON.parse(localStorage.getItem('user')).no_hp}</span><br/>
										
										<b>Keanggotaan</b>
										{/* <div className="divAnggotaReseller"> */}
										{/* <div className="divAnggotaAgen"> */}
										<div className={(parseInt(this.state.routeParams.jenis_mitra_id) === 2 ? "divAnggotaPriv" : (parseInt(this.state.routeParams.jenis_mitra_id) === 3 ? "divAnggotaReseller" : (parseInt(this.state.routeParams.jenis_mitra_id) === 4 ? "divAnggotaAgen" : (parseInt(this.state.routeParams.jenis_mitra_id) === 5 ? "divAnggotaDistributor" : "divAnggotaPriv"))))}>
											{this.state.routeParams.jenis_mitra}
										</div>
									</div>
								</a>
								}
								{localStorage.getItem('user') !== '' && localStorage.getItem('user') != null &&
								<div className="card card20" style={{textAlign:'left'}}>
									Alamat Pengiriman:<br/>
									<div>
										{this.state.routeParams.alamat_pengguna && this.state.routeParams.alamat_pengguna.length < 1 &&
										<div style={{fontSize:'10px'}}>
											Belum ada alamat pengiriman yang disimpan
										</div>
										}
										{this.state.routeParams.alamat_pengguna && this.state.routeParams.alamat_pengguna.length > 0 &&
										<div style={{fontSize:'10px'}}>
											<b>{this.state.routeParams.alamat_pengguna[0].nama_penerima}</b>
											<br/>
											{this.state.routeParams.alamat_pengguna[0].alamat_jalan}<br/> 
											{this.state.routeParams.alamat_pengguna[0].kecamatan}, {this.state.routeParams.alamat_pengguna[0].kabupaten}, {this.state.routeParams.alamat_pengguna[0].provinsi}
										</div>
										}
										<div style={{width:'100%', textAlign:'right', fontSize:'12px', paddingTop:'16px'}}>
											<a href="/AlamatPengguna" style={{display:'inline-flex', color:'#434343'}}>
												<i className="f7-icons">pencil</i>&nbsp;Kelola Alamat Pengiriman
											</a>
										</div>
									</div>
								</div>
								}
								{localStorage.getItem('user') !== '' && localStorage.getItem('user') != null &&
								<div className="card card20" style={{textAlign:'left'}}>
									Toko Mitra Aktif:
									<div style={{marginTop:'8px'}}>
										{this.state.mitra_terdekat.length > 0 &&
										<div style={{display:'inline-flex', width:'100%'}}>
											<div style={{
												minWidth:'45px', 
												height:'45px', 
												borderRadius:'50%', 
												background:'#434343',
												backgroundImage: 'url(/assets/images/illo-logo-icon.png)',
												backgroundSize: 'cover',
												backgroundPosition: 'center',
												backgroundRepeat: 'no-repeat',
												border: '1px solid #ccc',
												// margin: 'auto'
											}}>&nbsp;</div>
											<div style={{marginLeft:'8px', width:'100%'}}>
												<b>{this.state.mitra_terdekat[0].pengguna}</b>
												<br/>
												<span>{this.state.mitra_terdekat[0].jenis_mitra}</span>&nbsp;-&nbsp;
												{parseInt(this.state.mitra_terdekat[0].jenis_mitra_id) === 3 && <span>{this.state.mitra_terdekat[0].kecamatan}</span>}
												{parseInt(this.state.mitra_terdekat[0].jenis_mitra_id) === 4 && <span>{this.state.mitra_terdekat[0].kabupaten}</span>}
												{parseInt(this.state.mitra_terdekat[0].jenis_mitra_id) === 5 && <span>{this.state.mitra_terdekat[0].provinsi}</span>}
												{parseInt(this.state.mitra_terdekat[0].jenis_mitra_id) === 6 && <span>Indonesia</span>}
												<div style={{fontSize:'12px', width:'100%', textAlign:'right', marginTop:'8px'}}>
													<a href={"/GantiMitra?redirect="+this.props.location.pathname} style={{color:'#434343'}}>
														<i className="f7-icons" style={{fontSize:'13px'}}>pencil</i>Ganti Mitra
													</a>
												</div>
											</div>
										</div>
										}
										{this.state.mitra_terdekat.length > 0 &&
										<div style={{marginTop:'16px'}}>
											{parseInt(this.state.mitra_terdekat[0].jenis_mitra_id) === 6 &&
											<div style={{fontSize:'10px'}}>
												Belum ada distributor/agen/reseller di daerah Anda. Produk yang Anda beli akan langsung dikirimkan dari Illo Pusat
											</div>
											}
										</div>
										}
									</div>
								</div>
								}

								{/* {localStorage.getItem('user') !== '' && localStorage.getItem('user') != null &&
								<div className="card card20" style={{textAlign:'left'}}>
									<b>Menu Pengguna</b>
									<div className="blog-cat-detail">
										<ul>
											<li className="marg-15">
												<a href={"/Pembelian"}>
													<span>Pembelian</span>
												</a>
											</li>
											<li className="marg-15">
												<a href={"/Penjualan"}>
													<span>Penjualan</span>
												</a>
											</li>
											<li className="marg-15">
												<a href={"/AlamatPengiriman"}>
													<span>Alamat Pengiriman</span>
												</a>
											</li>
										</ul>
									</div>
								</div>
								} */}
								<a href="/faq" style={{color: '#434343'}}>
									<div className="card card20" style={{
										backgroundImage: 'url(/assets/images/faq.png)',
										backgroundPosition: 'top',
										backgroundSize: '80%',
										backgroundRepeat: 'no-repeat',
										minHeight: '160px',
										width: '100%',
										textAlign: 'center',
										paddingTop: '120px',
										paddingBottom: '16px'
									}}>
										Frequently Asked Question (FAQ)
									</div>
								</a>

								<div className="card card20">
									<h2 className="title" style={{marginBottom:'4px'}}>
										<span style={{fontSize:'20px', color:'#434343'}}>Promo</span>
									</h2>
									{this.state.images_samping.map((option_samping)=>{
										return (
											<a href={option_samping.tautan}>
												<div 
												className="card card20" 
												style={{
													height:'300px',
													background:'black',
													backgroundColor: '#434343',
													backgroundImage: 'url('+option_samping.original+')',
													backgroundSize: 'cover',
													backgroundPosition: 'center'
												}}
												>&nbsp;</div>
											</a>
										)
									})}
									{/* <div 
									className="card card20" 
									style={{
										height:'300px',
										background:'black',
										backgroundImage: 'url(/assets/contoh/ex_banner_2.jpg)',
										backgroundSize: 'cover'
									}}
									>&nbsp;</div>
									<div 
									className="card card20" 
									style={{
										height:'300px',
										background:'black',
										backgroundImage: 'url(/assets/contoh/ex_banner_1.jpg)',
										backgroundSize: 'cover'
									}}
									>&nbsp;</div>
									<div 
									className="card card20" 
									style={{
										height:'300px',
										background:'black',
										backgroundImage: 'url(/assets/contoh/ex_banner_3.jpg)',
										backgroundSize: 'cover'
									}}
									>&nbsp;</div> */}
								</div>

							</div>
							<div className="col-md-9 col-sm-12" style={{paddingRight:'8px', paddingLeft:'8px'}}>
								<div className="card card20">
									<div className="row">
										<div className="col-md-8 col-sm-12 col-text-center d-align-center" style={{borderBottom:'5px solid #ccc', paddingBottom:'0px', height:'45px'}}>
											<h2 className="title">
												<span style={{fontSize:'20px', color:'#434343'}}>Rekomendasi Untuk Anda</span>
											</h2>
										</div>
										<div className="col-md-12 col-sm-12" style={{display:'inline-flex', overflow:'auto', marginTop:'8px', paddingBottom:'16px'}}>
											{this.state.produk.rows.map((option)=>{
												return (
													<CardProduk produk={option} pengguna={localStorage.getItem('user') !== '' && localStorage.getItem('user') != null ? JSON.parse(localStorage.getItem('user')) : {}} />
													// <div className="card" style={{
													// 	minWidth:'256px', 
													// 	height:'365px', 
													// 	marginRight:'16px', 
													// 	borderRadius:'20px',
													// 	boxShadow: '0 4px 8px 0 rgba(0,0,0,0.2)',
													// 	transition: '0.3s',
													// 	border: '0px solid #ccc'
													// }}>
													// 	{/* {option.nama} */}
													// 	{option.gambar_produk && option.gambar_produk.length > 0 &&
													// 	<div
													// 		style={{
													// 			width:'100%',
													// 			height:'240px',
													// 			backgroundImage: 'url('+localStorage.getItem('api_base')+option.gambar_produk[0].nama_file+')',
													// 			backgroundRepeat:'no-repeat',
													// 			backgroundSize: 'cover',
													// 			backgroundPosition:'center',
													// 			borderRadius:'20px 20px 0px 0px'
													// 		}}
													// 	>&nbsp;</div>
													// 	}
													// 	<div style={{margin:'8px', maxHeight:'30px', overflow:'hidden', textOverflow:'ellipsis', flexFlow:'nowrap', width:'100%'}}>
													// 		<h3 className="title" style={{marginTop:'0px'}}>{option.nama}</h3>
													// 	</div>
													// 	<div style={{paddingTop:'0px', margin:'8px', maxHeight:'50px', overflow:'hidden', textOverflow:'ellipsis', flexFlow:'nowrap', marginTop:'-8px'}}>
													// 		{option.keterangan &&
													// 		<div className="boxKeterangan" style={{marginTop:'0px', fontSize:'10px'}} dangerouslySetInnerHTML={{ __html: option.keterangan.replace(/noreferrer/g, 'noreferrer" class="link external"').replace('<p class=""><br></p>','').replace(/(<([^>]+)>)/gi, "").substring(0,100) }} />
													// 		}
													// 	</div>
													// </div>
												)
											})}
										</div>
										<div className="col-md-8 col-sm-12 col-text-center d-align-center" style={{borderBottom:'5px solid #ccc', paddingBottom:'0px', height:'45px', marginTop:'16px'}}>
											<h2 className="title">
												<a href="/kategori"><span style={{fontSize:'20px', color:'#434343'}}>Kategori Produk</span></a>
											</h2>
										</div>
										<div className="col-md-12 col-sm-12" style={{display:'inline-flex', overflow:'auto', marginTop:'8px', paddingBottom:'16px'}}>
											{this.state.kategori_produk.rows.map((option)=>{
												return (
													// <a href={"/produk/"+option.kategori_produk_id} style={{width:'100%'}}>
													<a href={"/produk/"+option.kategori_produk_id}>
														<div className="card" style={{
															margin:'8px', 
															width:'200px', 
															background:(this.gradients[this.state.kategori_produk.rows.indexOf(option)]),minHeight:'60px', 
															textAlign:'right',
															color:'white', 
															fontWeight:'400',
															marginLeft:'0px',
															border:'none',
															minHeight:'100px',
															fontSize: '20px',
															borderRadius: '20px'
														}}>
															<div style={{
																width:'100%', 
																height:'100px', 
																background:'rgba(0, 0, 0, 0.4)',
																padding:'8px 16px 8px 16px',
																borderRadius: '20px'
															}}>
																<span style={{textShadow:'2px 2px #434343'}}>
																	{option.nama}
																</span>
															</div>
														</div>
													</a>
												)
											})}
										</div>
										<div className="col-md-8 col-sm-12 col-text-center d-align-center" style={{borderBottom:'5px solid #ccc', paddingBottom:'0px', height:'45px', marginTop:'16px'}}>
											<h2 className="title">
												<span style={{fontSize:'20px', color:'#434343'}}>Produk Best Seller</span>
											</h2>
										</div>
										<div className="col-md-12 col-sm-12" style={{display:'inline-flex', overflow:'auto', marginTop:'8px', paddingBottom:'16px'}}>
											{this.state.produk_best_seller.rows.map((option)=>{
												return (
													<CardProduk produk={option} pengguna={localStorage.getItem('user') !== '' && localStorage.getItem('user') != null ? JSON.parse(localStorage.getItem('user')) : {}} />
													// <div className="card" style={{
													// 	minWidth:'256px', 
													// 	height:'365px', 
													// 	marginRight:'16px', 
													// 	borderRadius:'20px',
													// 	boxShadow: '0 4px 8px 0 rgba(0,0,0,0.2)',
													// 	transition: '0.3s',
													// 	border: '0px solid #ccc'
													// }}>
													// 	{/* {option.nama} */}
													// 	{option.gambar_produk && option.gambar_produk.length > 0 &&
													// 	<div
													// 		style={{
													// 			width:'100%',
													// 			height:'240px',
													// 			backgroundImage: 'url('+localStorage.getItem('api_base')+option.gambar_produk[0].nama_file+')',
													// 			backgroundRepeat:'no-repeat',
													// 			backgroundSize: 'cover',
													// 			backgroundPosition:'center',
													// 			borderRadius:'20px 20px 0px 0px'
													// 		}}
													// 	>&nbsp;</div>
													// 	}
													// 	<div style={{margin:'8px', maxHeight:'30px', overflow:'hidden', textOverflow:'ellipsis', flexFlow:'nowrap', width:'100%'}}>
													// 		<h3 className="title" style={{marginTop:'0px'}}>{option.nama}</h3>
													// 	</div>
													// 	<div style={{paddingTop:'0px', margin:'8px', maxHeight:'50px', overflow:'hidden', textOverflow:'ellipsis', flexFlow:'nowrap', marginTop:'-8px'}}>
													// 		{option.keterangan &&
													// 		<div className="boxKeterangan" style={{marginTop:'0px', fontSize:'10px'}} dangerouslySetInnerHTML={{ __html: option.keterangan.replace(/noreferrer/g, 'noreferrer" class="link external"').replace('<p class=""><br></p>','').replace(/(<([^>]+)>)/gi, "").substring(0,100) }} />
													// 		}
													// 	</div>
													// </div>
												)
											})}
										</div>
									</div>
								</div>
								<div className="col-md-12 col-sm-12" style={{
									paddingRight:'0px', 
									paddingLeft:'0px'
								}}>
									{this.state.images_bawah.map((option_bawah)=>{
										return (
											<a href={option_bawah.tautan}>
												<div className="card card20" style={{
													minHeight:'180px',
													backgroundColor: '#434343',
													backgroundImage:'url('+option_bawah.original+')',
													backgroundSize:'cover',
													backgroundPosition: 'center',
													backgroundRepeat:'no-repeat',
													border:'none'
												}}>
													&nbsp;
												</div>
											</a>
										)
									})}
									{/* <div className="card card20" style={{
										minHeight:'180px',
										backgroundImage:'url(/assets/contoh/promo.png)',
										backgroundSize:'cover',
										backgroundRepeat:'no-repeat',
										border:'none'
									}}>
										&nbsp;
									</div>
									<div className="card card20" style={{
										minHeight:'180px',
										backgroundImage:'url(/assets/contoh/promo2.png)',
										backgroundSize:'cover',
										backgroundRepeat:'no-repeat',
										border:'none'
									}}>
										&nbsp;
									</div> */}
								</div>
							</div>
						</div>
					</div>
				</section>
				{/* <section id="produk_rekomendasi" style={{backgroundColor:'white'}}> */}
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
		)
  	}
}


function mapDispatchToProps(dispatch) {
    return bindActionCreators({
		getArtikel: Actions.getArtikel,
		getPengguna: Actions.getPengguna,
		getProduk: Actions.getProduk,
		getKategoriProduk: Actions.getKategoriProduk,
		getMitraTerdekat: Actions.getMitraTerdekat,
		getBanner: Actions.getBanner
    }, dispatch);
}

export default (connect(null, mapDispatchToProps)(HomeThree));

// export default HomeThree;
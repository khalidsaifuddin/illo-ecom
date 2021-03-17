import React,{Component} from 'react';
import Navbar from '../components/navbar';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as Actions from '../store/actions';
import Footer from '../components/footer';

class BlogList extends React.Component {

	state = {
		routeParams: {
			start: 0,
			limit: 20,
			publikasi: 2
		},
		artikel: {
			rows: [],
			total: 0
		},
		arrHalaman: [],
		halaman_aktif: 1
	}
	
	componentDidMount = () => {
		
		this.props.getArtikel(this.state.routeParams).then((result)=>{
			this.setState({
				artikel: result.payload
				// halaman: Math.ceil(this.state.artikel.total/this.state.routeParams.limit)
			},()=>{
				//cari jymlah halaman

				// console.log(this.state.halaman)
				// console.log(Math.ceil(this.state.artikel.total/this.state.routeParams.limit))
				let arrHalaman = []

				for (let index = 1; index <= Math.ceil(this.state.artikel.total/this.state.routeParams.limit); index++) {
					arrHalaman.push(index)
				}

				// console.log(arrHalaman)
				this.setState({
					halaman: Math.ceil(this.state.artikel.total/this.state.routeParams.limit),
					arrHalaman: arrHalaman
				})

			})
		})
		
		setTimeout(function () {


			document.querySelector(".loader-wrapper").style = "display: none";
		}, 2000)
	}

	klikHalaman = (halaman) => {
		// alert(halaman)
		let start_baru = (halaman > this.state.halaman_aktif ? parseInt(this.state.routeParams.start)+parseInt(this.state.routeParams.limit) : parseInt(this.state.routeParams.start)-parseInt(this.state.routeParams.limit) ) 

		this.setState({
			routeParams: {
				...this.state.routeParams,
				start: start_baru
			},
			halaman_aktif: halaman
		},()=>{
			this.props.getArtikel(this.state.routeParams).then((result)=>{
				this.setState({
					artikel: result.payload
				},()=>{
					// console.log(this.state.halaman_aktif
				})
			})
		})
	}

	render() {
		return (
			<div>
				<Navbar />
				<div className="page-margin">

					{/*breadcrumb start*/}
					<div className="breadcrumb-bg">
						<div className="container">
							<div className="row">
								<div className="col-md-6 col-sm-6 col-text-center d-align-center">
									<h2 className="title"><span> Blog</span></h2>
								</div>
								<div className="col-md-6 col-sm-6 col-text-center">
									<nav aria-label="breadcrumb" className="blog-bradcrumb ">
										<ol className="breadcrumb bg-transparent mb-0">
											<li className="breadcrumb-item"><a href="/">Beranda</a></li>
											<li className="breadcrumb-item active"><a href={null}>Blog</a></li>
										</ol>
									</nav>
								</div>
							</div>
						</div>
					</div>
					{/*breadcrumb end*/}

					{/*blog Section start*/}
					<section>
						<div className="container">
							<div className="row">
								<div className="col-sm-12">
									<div className="row blog-list">
										{this.state.artikel.rows.map((option)=>{
											return (
												<div className="col-md-6">
													<div className="blog-item">
														<div className="blog-block" style={{backgroundImage:'none'}}>
														{/* <div className="blog-block" style={{minHeight:'230px'}}> */}
															<div className="blog-box" style={{top: '50%'}}>
																<div className="overflow-hidden">
																	<a href={"blog-details/"+option.url_ramah}>
																		<div style={{
																			minHeight:'256px', 
																			maxHeight:'256px',
																			width: '100%',
																			background:'#434343',
																			backgroundImage: 'url(https://be.diskuis.id'+option.gambar+')',
																			backgroundSize: 'cover',
																			backgroundRepeat: 'no-repeat'
																		}}>&nbsp;</div>
																		{/* <img src={'https://be.diskuis.id'+option.gambar} alt="blog" className="img-fluid" style={{minHeight:'256px', maxHeight:'256px', width:'auto', maxWidth:'none', margin:'auto'}} /> */}
																	</a>
																</div>
																{/* <div className="overflow-hidden"><a href="blog-details"><img src={localStorage.getItem('api_base')+option.gambar} alt="blog" className="img-fluid" /></a></div> */}
															</div>
														</div>
														<div className="blog-text">
															<a href="blog-details">
																<h3>{option.judul}</h3>
																<p>{(option.konten ? option.konten.replace(/noreferrer/g, 'noreferrer" class="link external').replace(/(<([^>]+)>)/gi, "").replace('-&Nbsp;','- ').replace('&Nbsp;',' ').replace('&nbsp;',' ').substring(0,200)+"..." : '')}</p>
															</a>
															<h5>{option.nama_pengguna}</h5>
														</div>
													</div>
												</div>
											)
										})}
										{/* <div className="col-md-6">
											<div className="blog-item">
												<div className="blog-block">
													<div className="blog-box">
														<div className="overflow-hidden"><a href="blog-details"><img src="assets/images/blog/blog3.jpg" alt="blog" className="img-fluid" /></a></div>
													</div>
												</div>
												<div className="blog-text">
													<a href="blog-details">
														<h3>Judulnya satu</h3>
														<p>Lorem Ipsum Is Simply Dummy Text Of The Printing And Typesetting Industry. Lorem . Typesetting Industry. Lorem  Typesetting Indust.</p>
													</a>
													<h5>Mark jkcno</h5>
												</div>
											</div>
										</div>
										<div className="col-md-6">
											<div className="blog-item">
												<div className="blog-block">
													<div className="blog-box">
														<div className="overflow-hidden"><a href="blog-details"><img src="assets/images/blog/6.jpg" alt="blog" className="img-fluid" /></a></div>
													</div>
												</div>
												<div className="blog-text">
													<a href="blog-details">
														<h3>There are many variations of passages.</h3>
														<p>Lorem Ipsum Is Simply Dummy Text Of The Printing And Typesetting Industry. Lorem . Typesetting Industry. Lorem  Typesetting Indust.</p>
													</a>
													<h5>Mark jkcno</h5>
												</div>
											</div>
										</div>
										<div className="col-md-6">
											<div className="blog-item">
												<div className="blog-block">
													<div className="blog-box">
														<div className="overflow-hidden"><a href="blog-details"><img src="assets/images/blog/7.jpg" alt="blog" className="img-fluid" /></a></div>
													</div>
												</div>
												<div className="blog-text">
													<a href="blog-details">
														<h3>There are many variations of passages.</h3>
														<p>Lorem Ipsum Is Simply Dummy Text Of The Printing And Typesetting Industry. Lorem . Typesetting Industry. Lorem  Typesetting Indust.</p>
													</a>
													<h5>Mark jkcno</h5>
												</div>
											</div>
										</div>
										<div className="col-md-6">
											<div className="blog-item">
												<div className="blog-block">
													<div className="blog-box">
														<div className="overflow-hidden"><a href="blog-details"><img src="assets/images/blog/8.jpg" alt="blog" className="img-fluid" /></a></div>
													</div>
												</div>
												<div className="blog-text">
													<a href="blog-details">
														<h3>There are many variations of passages.</h3>
														<p>Lorem Ipsum Is Simply Dummy Text Of The Printing And Typesetting Industry. Lorem . Typesetting Industry. Lorem  Typesetting Indust.</p>
													</a>
													<h5>Mark jkcno</h5>
												</div>
											</div>
										</div>
										<div className="col-md-6">
											<div className="blog-item">
												<div className="blog-block">
													<div className="blog-box">
														<div className="overflow-hidden"><a href="blog-details"><img src="assets/images/blog/9.jpg" alt="blog" className="img-fluid" /></a></div>
													</div>
												</div>
												<div className="blog-text">
													<a href="blog-details">
														<h3>There are many variations of passages.</h3>
														<p>Lorem Ipsum Is Simply Dummy Text Of The Printing And Typesetting Industry. Lorem . Typesetting Industry. Lorem  Typesetting Indust.</p>
													</a>
													<h5>Mark jkcno</h5>
												</div>
											</div>
										</div>
										<div className="col-md-6">
											<div className="blog-item">
												<div className="blog-block">
													<div className="blog-box">
														<div className="overflow-hidden"><a href="blog-details"><img src="assets/images/blog/10.jpg" alt="blog" className="img-fluid" /></a></div>
													</div>
												</div>
												<div className="blog-text">
													<a href="blog-details">
														<h3>There are many variations of passages.</h3>
														<p>Lorem Ipsum Is Simply Dummy Text Of The Printing And Typesetting Industry. Lorem . Typesetting Industry. Lorem  Typesetting Indust.</p>
													</a>
													<h5>Mark jkcno</h5>
												</div>
											</div>
										</div> */}
									</div>
								</div>

								{/*paginations*/}
								<div className="col-md-12">
									<nav aria-label="Page navigation" className="blog-pagination">
										<ul className="pagination justify-content-center blog-pagin">
											{/* <li className="page-item">
												<a className="page-link" href={null} aria-label="Previous">
													<i className="fa fa-angle-left" aria-hidden="true"></i>
												</a>
											</li> */}

											{this.state.arrHalaman.map((option)=>{
												return (
													<li className={"page-item "+(this.state.halaman_aktif === option ? 'active' : '')}><a className="page-link" onClick={()=>this.klikHalaman(option)}>{option}</a></li>
												)
											})}
											

											{/* <li className="page-item active"><a className="page-link" href={null}>1</a></li> */}
											{/* <li className="page-item"><a className="page-link" href={null}>2</a></li> */}
											{/* <li className="page-item"><a className="page-link" href={null}>3</a></li> */}
											{/* <li className="page-item">
												<a className="page-link" href={null} aria-label="Next">
													<i className="fa fa-angle-right" aria-hidden="true"></i>
												</a>
											</li> */}
										</ul>
									</nav>
								</div>
								{/*paginations end*/}
							</div>
						</div>
					</section>
					{/*blog Section End*/}

					{/*Footer Section start*/}
					{/* <div className="bg-light">
						<div className="container">
							<div className="row">
								<div className="col-md-12">
									<div className="copyright-section">
										<p>2020 Copyright &copy; powered by Diskuis</p>
									</div>
								</div>
							</div>
						</div>
					</div> */}
					<Footer />
					{/*Footer Section End*/}
				</div>
			</div>
		);
	}
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
		getArtikel: Actions.getArtikel
    }, dispatch);
}

export default (connect(null, mapDispatchToProps)(BlogList));
// export default BlogList;
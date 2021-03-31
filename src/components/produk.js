import React from 'react';

import Navbar from '../components/navbar';
import {withRouter} from 'react-router';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as Actions from '../store/actions';

import moment from 'moment';
import Footer from './footer';
import CardProduk from './CardProduk';

class produk extends React.Component {
	state = {
		routeParams: {
			start: 0,
			limit: 20,
            kategori_produk_id: (this.props.match.params.kategori_produk_id && this.props.match.params.kategori_produk_id !== 'semua' ? this.props.match.params.kategori_produk_id : null)
		},
		kategori_produk: {
			rows: [],
			total: 0
		},
		produk: {
			rows: [],
			total: 0
		}
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

	bulan = [
        'Januari',
        'Februari',
        'Maret',
        'April',
        'Mei',
        'Juni',
        'Juli',
        'Agustus',
        'September',
        'Oktober',
        'November',
        'Desember'
    ]
	
	componentDidMount() {
        
        // console.log(this.props.match.params)

		this.props.getProduk(this.state.routeParams).then((result)=>{
			this.setState({
				produk: result.payload
			},()=>{
                this.props.getKategoriProduk({...this.state.routeParams, kategori_produk_id: null}).then((result)=>{
                    this.setState({
                        kategori_produk: result.payload
                    })
                })
            })
		})

		setTimeout(function () {
			document.querySelector(".loader-wrapper").style = "display: none";
		}, 2000);
	}

	render() {
		return (
			<div>
				<Navbar />
				{/*blog right Section start*/}
				<div className="page-margin">
					{/*breadcrumb start*/}
					<div className="breadcrumb-bg">
						<div className="container">
							<div className="row">
								<div className="col-md-6 col-sm-6 col-text-center d-align-center">
									<h2 className="title"><span>Produk</span></h2>
								</div>
								<div className="col-md-6 col-sm-6 col-text-center">
									<nav aria-label="breadcrumb" className="blog-bradcrumb ">
										<ol className="breadcrumb bg-transparent mb-0">
											<li className="breadcrumb-item"><a href="/">Beranda</a></li>
											<li className="breadcrumb-item"><a href="/produk/semua">Produk</a></li>
											<li className="breadcrumb-item active"><a href={null}>
                                                {this.props.match.params.kategori_produk_id && this.props.match.params.kategori_produk_id === 'semua' && 'Semua'}
                                                {this.state.kategori_produk.rows.map((option)=>{
                                                    return (
                                                        <span>
                                                            {this.props.match.params.kategori_produk_id && this.props.match.params.kategori_produk_id === option.kategori_produk_id && option.nama}
                                                        </span>
                                                    )
                                                })}
                                            </a></li>
										</ol>
									</nav>
								</div>
							</div>
						</div>
					</div>
					{/*breadcrumb end*/}

					{/*blog Section start*/}
					<section style={{marginTop:'-80px'}}>
						<div className="container">
							<div className="row">
								<div className="col-md-8 col-lg-9 blog-sec">
									<div className="row blog-list">

                                    {this.state.produk.rows.map((option)=>{
                                        return (
                                            <div className="col-lg-4 col-md-6">
                                                <CardProduk produk={option} pengguna={localStorage.getItem('user') !== '' && localStorage.getItem('user') != null ? JSON.parse(localStorage.getItem('user')) : {}} />
                                                {/* <div className="card" style={{
                                                    minWidth:'256px', 
                                                    height:'365px', 
                                                    marginRight:'16px', 
                                                    borderRadius:'20px',
                                                    boxShadow: '0 4px 8px 0 rgba(0,0,0,0.2)',
                                                    transition: '0.3s',
                                                    border: '0px solid #ccc',
                                                    marginBottom:'16px'
                                                }}>
                                                    
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
                                                </div> */}
                                            </div>
                                        )
                                    })}

										{/* <div className="col-lg-4 col-md-6">
											<div className="blog-item">
												<div className="blog-block">
													<div className="blog-box">
														<div className="overflow-hidden"><a href="blog-details"><img src="assets/images/blog/blog3.jpg" alt="blog" className="img-fluid" /></a></div>
													</div>
												</div>
												<div className="blog-text">
													<a href="blog-details">
														<h3>There are many variations of passages.</h3>
														<p>Lorem Ipsum Is Simply Dummy Text Of The Printing And Typesetting Industry Lorem .</p>
													</a>
													<h5>Mark jkcno</h5>
												</div>
											</div>
										</div> */}
										{/* <div className="col-lg-6 col-md-12">
											<div className="blog-item">
												<div className="blog-block">
													<div className="blog-box">
														<div className="overflow-hidden"><a href="blog-details"><img src="assets/images/blog/6.jpg" alt="blog" className="img-fluid" /></a></div>
													</div>
												</div>
												<div className="blog-text">
													<a href="blog-details">
														<h3>There are many variations of passages.</h3>
														<p>Lorem Ipsum Is Simply Dummy Text Of The Printing And Typesetting Industry Lorem .</p>
													</a>
													<h5>Mark jkcno</h5>
												</div>
											</div>
										</div>
										<div className="col-lg-6 col-md-12">
											<div className="blog-item">
												<div className="blog-block">
													<div className="blog-box">
														<div className="overflow-hidden"><a href="blog-details"><img src="assets/images/blog/7.jpg" alt="blog" className="img-fluid" /></a></div>
													</div>
												</div>
												<div className="blog-text">
													<a href="blog-details">
														<h3>There are many variations of passages.</h3>
														<p>Lorem Ipsum Is Simply Dummy Text Of The Printing And Typesetting Industry Lorem .</p>
													</a>
													<h5>Mark jkcno</h5>
												</div>
											</div>
										</div>
										<div className="col-lg-6 col-md-12">
											<div className="blog-item">
												<div className="blog-block">
													<div className="blog-box">
														<div className="overflow-hidden"><a href="blog-details"><img src="assets/images/blog/8.jpg" alt="blog" className="img-fluid" /></a></div>
													</div>
												</div>
												<div className="blog-text">
													<a href="blog-details">
														<h3>There are many variations of passages.</h3>
														<p>Lorem Ipsum Is Simply Dummy Text Of The Printing And Typesetting Industry Lorem .</p>
													</a>
													<h5>Mark jkcno</h5>
												</div>
											</div>
										</div>
										<div className="col-lg-6 col-md-12">
											<div className="blog-item">
												<div className="blog-block">
													<div className="blog-box">
														<div className="overflow-hidden"><a href="blog-details"><img src="assets/images/blog/9.jpg" alt="blog" className="img-fluid" /></a></div>
													</div>
												</div>
												<div className="blog-text">
													<a href="blog-details">
														<h3>There are many variations of passages.</h3>
														<p>Lorem Ipsum Is Simply Dummy Text Of The Printing And Typesetting Industry Lorem .</p>
													</a>
													<h5>Mark jkcno</h5>
												</div>
											</div>
										</div>
										<div className="col-lg-6 col-md-12">
											<div className="blog-item">
												<div className="blog-block">
													<div className="blog-box">
														<div className="overflow-hidden"><a href="blog-details"><img src="assets/images/blog/9.jpg" alt="blog" className="img-fluid" /></a></div>
													</div>
												</div>
												<div className="blog-text">
													<a href="blog-details">
														<h3>There are many variations of passages.</h3>
														<p>Lorem Ipsum Is Simply Dummy Text Of The Printing And Typesetting Industry Lorem .</p>
													</a>
													<h5>Mark jkcno</h5>
												</div>
											</div>
										</div> */}
									</div>
								</div>
								<div className="col-md-4 col-lg-3 order-md-last list-sidebar">
									<div className="sidebar">
										<div className="sidebar-space">
											<h4 className="blog-title">Kategori Produk</h4>
											<div className="blog-divider"></div>
											<div className="blog-cat-detail">
												<ul>
                                                    <li className="marg-15">
                                                        <a href={"/produk/semua"}>
                                                            {this.props.match.params.kategori_produk_id === 'semua' ? <b style={{color:'#064F45', fontSize:'16px'}}>Semua Kategori</b> : <span>Semua Kategori</span>}
                                                        </a>
                                                    </li>
                                                    {this.state.kategori_produk.rows.map((option)=>{
                                                        return (
                                                            <li className="marg-15">
                                                                <a href={"/produk/"+option.kategori_produk_id}>
                                                                    {/* {option.nama} */}
                                                                    {this.props.match.params.kategori_produk_id === option.kategori_produk_id ? <b style={{color:'#064F45', fontSize:'16px'}}>{option.nama}</b> : <span>{option.nama}</span>}
                                                                </a>
                                                            </li>
                                                        )
                                                    })}
													{/* <li className="marg-15">
														<a href="blog-details">
															<i className="fa fa-angle-right" aria-hidden="true"></i> Lorem Ipsum is simply
			                                        </a>
													</li>
													<li className="marg-15">
														<a href="blog-details">
															<i className="fa fa-angle-right" aria-hidden="true"></i> There Are Many Variations
			                                        </a>
													</li>
													<li className="marg-15">
														<a href="blog-details">
															<i className="fa fa-angle-right" aria-hidden="true"></i> it has survived not only five
			                                        </a>
													</li>
													<li className="marg-15">
														<a href="blog-details">
															<i className="fa fa-angle-right" aria-hidden="true"></i> Lorem Ipsum has been the.
			                                        </a>
													</li>
													<li className="marg-15">
														<a href="blog-details">
															<i className="fa fa-angle-right" aria-hidden="true"></i> Lorem Ipsum is random.
			                                        </a>
													</li> */}
												</ul>
											</div>
										</div>
										{/* <div className="sidebar-space">
											<h4 className="blog-title">Popular Tag</h4>
											<div className="blog-divider"></div>
											<div className="tags marg-20">
												<a href={null}><span className="badge badge-theme">Responsive design</span></a>
												<a href={null}><span className="badge badge-theme">Color options</span></a>
												<a href={null}><span className="badge badge-theme">Multiple demos</span></a>
												<a href={null}><span className="badge badge-theme">Dedicated support</span></a>
												<a href={null}><span className="badge badge-theme">Documentation</span></a>
												<a href={null}><span className="badge badge-theme">PSD is included</span></a>
												<a href={null}><span className="badge badge-theme">Text</span></a>
												<a href={null}><span className="badge badge-theme">Support</span></a>
												<a href={null}><span className="badge badge-theme">Responsive</span></a>
												<a href={null}><span className="badge badge-theme">Design</span></a>
											</div>
										</div> */}
										{/* <h4 className="blog-title">Recent Post</h4>
										<div className="blog-divider"></div>
										<div className="recent-blog marg-20">
											<div className="media">
												<img className="mr-3" src="assets/images/blog/1.jpg" alt="blog" />
												<div className="media-body">
													<a href="blog-details">
														<h5 className="mt-0">Lorem Ipsum Is Simply Dummy</h5>
													</a>
													<p className="m-0">05 March 2011</p>
												</div>
											</div>
											<div className="media">
												<img className="mr-3" src="assets/images/blog/2.jpg" alt="blog" />
												<div className="media-body">
													<a href="blog-details">
														<h5 className="mt-0">Lorem Ipsum has been the</h5>
													</a>
													<p className="m-0">14 january 2015</p>
												</div>
											</div>
											<div className="media">
												<img className="mr-3" src="assets/images/blog/3.jpg" alt="blog" />
												<div className="media-body">
													<a href="blog-details">
														<h5 className="mt-0">all the Lorem Ipsum Generator</h5>
													</a>
													<p className="m-0">30 November 2015</p>
												</div>
											</div>
										</div> */}
									</div>
								</div>
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
										<p>2018- 19 Copyright &copy; powered by Company name</p>
									</div>
								</div>
							</div>
						</div>
					</div> */}
                    <Footer />
					{/*Footer Section End*/}
				</div>
				{/*blog right Section end*/}
			</div>
		);
	}
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
		getArtikel: Actions.getArtikel,
		getProduk: Actions.getProduk,
        getKategoriProduk: Actions.getKategoriProduk
    }, dispatch);
}

export default (connect(null, mapDispatchToProps)(produk));

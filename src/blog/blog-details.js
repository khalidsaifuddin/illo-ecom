import React from 'react';
import Navbar from '../components/navbar';
import {withRouter} from 'react-router';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as Actions from '../store/actions';

import moment from 'moment';

class BlogDetails extends React.Component {

	state = {
		routeParams: {
			start: 0,
			limit: 20
		},
		artikel: {
			rows: [],
			total: 0
		},
		record_artikel: {}
	}

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

		console.log(this.props.location.pathname.split('/'))
		let url_ramah = ''

		try {
			url_ramah = this.props.location.pathname.split('/')[2]

			this.props.getArtikel({...this.state.routeParams, url_ramah: url_ramah}).then((result)=>{

				if(result.payload.total > 0){

					this.setState({
						...this.state,
						artikel: result.payload,
						record_artikel: result.payload.rows[0]
					})

				}

			})
		} catch (error) {
			
		}

		// console.log(url_ramah)


		setTimeout(function () {
			document.querySelector(".loader-wrapper").style = "display: none";
		}, 2000);
	}
	
	render() {

		let tanggal = '';
		let tgl = new Date(this.state.record_artikel.tanggal);

		tanggal = moment(this.state.record_artikel.tanggal).format('D') + ' ' + this.bulan[(moment(this.state.record_artikel.tanggal).format('M')-1)] + ' ' + moment(this.state.record_artikel.tanggal).format('YYYY');


		return (
			<div>
				<Navbar />
				<div className="page-margin">

					<div className="breadcrumb-bg">
						<div className="container">
							<div className="row">
								<div className="col-md-12 col-sm-12 col-text-center">
									<nav aria-label="breadcrumb" className="blog-bradcrumb ">
										<ol className="breadcrumb bg-transparent mb-0">
											<li className="breadcrumb-item"><a href="/">Beranda</a></li>
											<li className="breadcrumb-item"><a href="/Blog">Blog</a></li>
											<li className="breadcrumb-item active"><a href={null}>Artikel</a></li>
											{/* <li className="breadcrumb-item active"><a href={null}>{this.state.record_artikel.judul}</a></li> */}
										</ol>
									</nav>
								</div>
								<div className="col-md-12 col-sm-12 col-text-center d-align-center">
									<h2 className="title">
										{/* blog<span> Details</span> */}
										<b>{this.state.record_artikel.judul}</b>
									</h2>
								</div>
							</div>
						</div>
					</div>

					<section style={{paddingTop:'16px'}}>
						<div className="container">
							<div className="row">
								<div className="col-sm-12">
									<div className="blog-item">
										<div className="blog-block" style={{backgroundImage:'none'}}>
											<div className="blog-box">
												<div className="overflow-hidden">
													<a href={null}>
														<div style={{
															minHeight:'600px', 
															maxHeight:'600px',
															width: '100%',
															background:'#434343',
															backgroundImage: 'url(https://be.diskuis.id'+this.state.record_artikel.gambar+')',
															backgroundSize: 'cover',
															backgroundRepeat: 'no-repeat'
														}}>&nbsp;</div>
														{/* <img src={"https://be.diskuis.id"+this.state.record_artikel.gambar} alt="blog" className="img-fluid" style={{minHeight:'600px', maxHeight:'600px', width:'auto', maxWidth:'none', margin:'auto'}} /> */}
													</a>
												</div>
											</div>
										</div>
										<div className="blog-text">
											<h6>{tanggal}</h6>
											{/* <a href={null}>
												<h3 className="blog-head">There are many variations of passages of Lorem Ipsum available, </h3>
											</a> */}
											<div className="blog-divider"></div>
											<div className="blog-description">
												<div style={{marginTop:'-8px', width:'100%', overflowX:'hidden'}}>
													<div dangerouslySetInnerHTML={{ __html: (this.state.record_artikel.konten ? this.state.record_artikel.konten.replace(/noreferrer/g, 'noreferrer" class="link external') : "<p></p>")}} />
												</div>
												{/* <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>
												<p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>
												<h5>Mark jkcno</h5><h5 className="pull-right"> 10 <i className="fa fa-heart-o"></i>, 50 <i className="fa fa-comments-o"></i></h5> */}
											</div>
										</div>
									</div>
									<div className="blog-divider"></div>
									{/* <div className="reply-comment">
										<div className="media">
											<img className="align-self-top mr-3" src="assets/images/blog/blog-comment.jpg" alt="blog" />
											<div className="media-body">
												<a href={null}>
													<h5 className="mt-0">Lorem Ipsum Is Simply Dummy</h5>
												</a>
												<p>Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque ante sollicitudin. Cras purus odio, vestibulum in vulputate at, tempus viverra turpis. Fusce condimentum nunc ac nisi vulputate fringilla. Donec lacinia congue felis in faucibus.Donec sed odio dui.</p>
											</div>
										</div>
										<div className="media">
											<img className="align-self-top mr-3" src="assets/images/blog/blog-comment-two.jpg" alt="blog" />
											<div className="media-body">
												<a href={null}>
													<h5 className="mt-0">Lorem Ipsum has been the</h5>
												</a>
												<p>Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque ante sollicitudin. Cras purus odio, vestibulum in vulputate at, tempus viverra turpis. Fusce condimentum nunc ac nisi vulputate fringilla. Donec lacinia congue felis in faucibus.Donec sed odio dui.</p>
											</div>
										</div>
										<div className="media">
											<img className="align-self-top mr-3" src="assets/images/blog/blog-comment-three.jpg" alt="blog" />
											<div className="media-body">
												<a href={null}>
													<h5 className="mt-0">all the Lorem Ipsum Generator</h5>
												</a>
												<p>Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque ante sollicitudin. Cras purus odio, vestibulum in vulputate at, tempus viverra turpis. Fusce condimentum nunc ac nisi vulputate fringilla. Donec lacinia congue felis in faucibus.</p>
											</div>
										</div>
									</div>
									<div className="blog-divider"></div>
									<div className="row">
										<div className="col-md-10 offset-md-1 leave-coment">
											<h3 className="text-center">Leave Your Comment</h3>
											<form className="theme-form footer-form p-0 mt-3">
												<div className="form-group">
													<div className="row">
														<div className="col-lg-6 col-md-12 md-fgrup-margin">
															<input type="text" className="form-control" placeholder="your name" />
														</div>
														<div className="col-lg-6 col-md-12">
															<input type="email" className="form-control" id="exampleFormControlInput1" placeholder="email address" />
														</div>
													</div>
												</div>
												<div className="form-group">
													<textarea className="form-control" id="exampleFormControlTextarea1" rows="4" placeholder="message"></textarea>
												</div>
												<div className="form-button">
													<button type="submit" className="btn btn-custom theme-color">send</button>
												</div>
											</form>
										</div>
									</div> */}
								</div>
							</div>
						</div>
					</section>

					<div className="bg-light">
						<div className="container">
							<div className="row">
								<div className="col-md-12">
									<div className="copyright-section">
										<p>2020 Copyright &copy; powered by Diskuis</p>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
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

export default (connect(null, mapDispatchToProps)(BlogDetails));

// export default withRouter(BlogDetails);
// export default BlogDetails;
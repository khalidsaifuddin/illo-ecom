import React from 'react';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as Actions from '../store/actions';

class Navbar extends React.Component {

	state = {
		routeParams: {
			start: 0,
			limit: 20,
			pengguna_id: (parseInt(localStorage.getItem('sudah_login')) === 1 ? JSON.parse(localStorage.getItem('user')).pengguna_id : null)
		},
		keranjang: {
			rows: [],
			total: 0
		}
	}
	
	componentDidMount() {
		console.log(localStorage.getItem('sudah_login'))

		this.props.getKeranjang(this.state.routeParams).then((result)=>{
			this.setState({
				keranjang: result.payload
			})
		})

		setTimeout(function () {
			document.querySelector(".loader-wrapper").style = "display: none";
		}, 2000);
	}

	render() {
		return (
			<nav className="navbar navbar-expand-lg navbar-light theme-nav fixed-top">
				<div id="navbar-main" className="container">
					{parseInt(localStorage.getItem('inframe')) !== 1 &&
					<a className="navbar-brand" href={`${process.env.PUBLIC_URL}/`}><img src="/assets/images/illo-logo.png" alt="logo" style={{width:'100px'}} /></a>
					}
					<button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation" style={{marginTop:'8px', marginBottom:'8px'}}>
						<span className="navbar-toggler-icon"></span>
					</button>
					<div className="collapse navbar-collapse default-nav" id="navbarSupportedContent">
						<ul className="navbar-nav ml-auto" id="mymenu">
							<li className="nav-item">
								<a className="nav-link" href="/">Beranda</a>
							</li>
							{/* <li className="nav-item">
								<a className="nav-link" href="#about">Tentang</a>
							</li> */}
							{/* <li className="nav-item">
								<a className="nav-link" href="#feature">Fitur</a>
							</li> */}
							{/* <li className="nav-item">
								<a className="nav-link" href="#screenshot">Screenshot</a>
							</li> */}
							<li className="nav-item">
								<a className="nav-link" href="/kategori">Kategori</a>
							</li>
							<li className="nav-item">
								<a className="nav-link" href="/produk/semua">Produk</a>
							</li>
							<li className="nav-item">
								<a className="nav-link" href="/mitra">Mitra</a>
							</li>
							<li className="nav-item">
								<a className="nav-link" href="/blog">Blog</a>
							</li>
							<li className="nav-item">
								<a className="nav-link" href="/verifikasi">Verifikasi</a>
							</li>
							<li className="nav-item">
								<a className="nav-link" href="/keranjang">
									<i className="f7-icons">cart</i>&nbsp;
									Keranjang ({this.state.keranjang.total > 0 ? this.state.keranjang.total : '0'})
								</a>
							</li>
							{parseInt(localStorage.getItem('sudah_login')) === 1 &&
							<li className="nav-item">
								<a className="nav-link" href="/profil">
									<i className="f7-icons">person</i>&nbsp;
									{JSON.parse(localStorage.getItem('user')).nama}
								</a>
							</li>
							}
							{parseInt(localStorage.getItem('sudah_login')) !== 1 &&
							<li className="nav-item">
								<a className="nav-link" href="/login">
									<i className="f7-icons">square_arrow_right</i>&nbsp;
									Login/Daftar
								</a>
							</li>
							}
							{/* <li className="nav-item dropdown">
								<a className="nav-link dropdown-toggle" href="#blog" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Blog</a> */}
								{/* <ul className="dropdown-menu">
									<li className="nav-item"><a className="nav-link" href={`${process.env.PUBLIC_URL}/blog-list`} target="_blank">blog list</a></li>
									<li className="nav-item"><a className="nav-link" href={`${process.env.PUBLIC_URL}/blog-details`} target="_blank">blog details</a></li>
									<li className="nav-item"><a className="nav-link" href={`${process.env.PUBLIC_URL}/blog-leftside`} target="_blank">leftsidebar</a></li>
									<li className="nav-item"><a className="nav-link" href={`${process.env.PUBLIC_URL}/blog-rightside`} target="_blank">rightsidebar</a></li>
									<li className="nav-item"><a className="nav-link" href={`${process.env.PUBLIC_URL}/blog-left-sidebar`} target="_blank">details leftsidebar</a></li>
									<li className="nav-item"><a className="nav-link" href={`${process.env.PUBLIC_URL}/blog-right-sidebar`} target="_blank">details rightsidebar</a></li>
								</ul> */}
							{/* </li> */}
							{/* <li className="nav-item">
								<a className="nav-link" href="#price" data-menuanchor="price">Harga</a>
							</li> */}
							{/* <li className="nav-item">
								<a style={{border:'2px solid #CE5520', marginBottom:'8px'}} className="nav-link" href="https://app.diskuis.id/" data-menuanchor="contact">Buka Aplikasi</a>
							</li> */}
							{/* <li className="nav-item dropdown">
								<a className="nav-link dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Other page</a>
								<ul className="dropdown-menu">
									<li className="nav-item"><a className="nav-link" href={`${process.env.PUBLIC_URL}/sign-in`} target="_blank">sign in</a></li>
									<li className="nav-item"><a className="nav-link" href={`${process.env.PUBLIC_URL}/sign-up`} target="_blank">sign up</a></li>
									<li className="nav-item"><a className="nav-link" href={`${process.env.PUBLIC_URL}/forget-password`} target="_blank">Forget Password</a></li>
									<li className="nav-item"><a className="nav-link" href={`${process.env.PUBLIC_URL}/thank-you`} target="_blank">Thank you</a></li>
									<li className="nav-item"><a className="nav-link" href={`${process.env.PUBLIC_URL}/review`} target="_blank">Review</a></li>
									<li className="nav-item"><a className="nav-link" href={`${process.env.PUBLIC_URL}/404`} target="_blank">404</a></li>
									<li className="nav-item"><a className="nav-link" href={`${process.env.PUBLIC_URL}/faq`} target="_blank">FAQ</a></li>
									<li className="nav-item"><a className="nav-link" href={`${process.env.PUBLIC_URL}/download`} target="_blank">Download</a></li>
									<li className="nav-item"><a className="nav-link" href={`${process.env.PUBLIC_URL}/coming-soon`} target="_blank">Coming Soon</a></li>
								</ul>
							</li> */}
						</ul>
					</div>
				</div>
			</nav>
		);
	}
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
		getKeranjang: Actions.getKeranjang
    }, dispatch);
}

export default (connect(null, mapDispatchToProps)(Navbar));
// export default Navbar;
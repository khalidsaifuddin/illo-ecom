import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import NoMatch from './pages/404';
import App from './demo_page/index';
import HomeOne from './home-one';
import HomeTwo from './home-two';
import HomeThree from './home-three';
import BlogDetails from './blog/blog-details';
import BlogList from './blog/blog-list';
import BlogLeftSidebar from './blog/blog-leftsidebar';
import BlogRightSidebar from './blog/blog-rightsidebar';
import BlogLeftside from './blog/blog-leftside';
import BlogRightside from './blog/blog-rightside';
import SignIn from './pages/sign-in';
import SignUp from './pages/sign-up';
import ForgetPassword from './pages/forget-pwd';
import ThankYou from './pages/thank-you';
import Review from './pages/review';
import PageNotFound from './pages/404';
import Faq from './components/Faq';
import Download from './pages/download';
import ComingSoon from './pages/coming-soon';
import registerServiceWorker from './registerServiceWorker';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import {Provider} from 'react-redux';
import store from './store';
import tentang from './components/TentangApp';
import kategori from './components/kategori';
import login from './components/login';
import produk from './components/produk';
import tampilProduk from './components/tampilProduk';
import profil from './components/profil';
import keranjang from './components/keranjang';
import Checkout from './components/Checkout';
import Pembayaran from './components/Pembayaran';
import Pembelian from './components/Pembelian';
import Penjualan from './components/Penjualan';
import KonfirmasiPembayaran from './components/KonfirmasiPembayaran';
import AlamatPengguna from './components/AlamatPengguna';
import FormAlamatPengguna from './components/FormAlamatPengguna';
import verifikasi from './components/verifikasi';
import HasilVerifikasi from './components/HasilVerifikasi';
import GantiMitra from './components/GantiMitra';
import Mitra from './components/Mitra';
import batalTransaksi from './components/batalTransaksi';
import PetunjukTransaksi from './components/PetunjukTransaksi';
import SyaratKetentuan from './components/SyaratKetentuan';
import PengajuanMitra from './components/PengajuanMitra';
import KonfirmasiDiterima from './components/KonfirmasiDiterima';

// localStorage.setItem('api_base','https://be.diskuis.id')
localStorage.setItem('api_base','http://117.53.47.43:8085')
// localStorage.setItem('api_base','http://illobackend:8888')

localStorage.setItem('api_base_gambar','http://117.53.47.43:8085')

class Root extends React.Component {

	getParameterByName = (name, url = this.props.location.search) => {
		name = name.replace(/[\[\]]/g, '\\$&');
		var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
			results = regex.exec(url);
		if (!results) return null;
		if (!results[2]) return '';
		return decodeURIComponent(results[2].replace(/\+/g, ' '));
	}

	componentDidMount = () => {
		let pengguna_id = this.getParameterByName('loginRedirect', window.location.href)
		let inframe = this.getParameterByName('inframe', window.location.href)
		let user = this.getParameterByName('user', window.location.href)

		if(pengguna_id && parseInt(localStorage.getItem('sudah_login')) !== 1){
			console.log(pengguna_id)
			console.log(user)

			localStorage.setItem('user', user)
			localStorage.setItem('sudah_login', 1)
			// localStorage.setItem('inframe', 1)

			window.location.reload()
		}else{
			// localStorage.setItem('inframe', 0)
		}

		if(parseInt(inframe) === 1){
			localStorage.setItem('inframe', 1)
		}else{
			localStorage.setItem('inframe', 0)
		}

		// console.log()
	}

  	render() {
  	return(
  		<BrowserRouter basename={'/'} >
		  	<Switch>
			  <Route exact path={`${process.env.PUBLIC_URL}/`} component={HomeThree}/>
			  <Route path={`${process.env.PUBLIC_URL}/home-one`} component={HomeOne}/>
			  <Route path={`${process.env.PUBLIC_URL}/home-two`} component={HomeTwo}/>
			  <Route path={`${process.env.PUBLIC_URL}/home-three`} component={HomeThree}/>
			  <Route path={`${process.env.PUBLIC_URL}/blog-details`} component={BlogDetails}/>
			  <Route path={`${process.env.PUBLIC_URL}/blog`} component={BlogList}/>
			  <Route path={`${process.env.PUBLIC_URL}/login`} component={SignIn}/>
			  <Route path={`${process.env.PUBLIC_URL}/daftar`} component={SignUp}/>
			  <Route path={`${process.env.PUBLIC_URL}/profil`} component={profil}/>
			  <Route path={`${process.env.PUBLIC_URL}/hasilVerifikasi/:kode_validasi_pengguna_id`} component={HasilVerifikasi}/>
			  <Route path={`${process.env.PUBLIC_URL}/AlamatPengguna`} component={AlamatPengguna}/>
			  <Route path={`${process.env.PUBLIC_URL}/GantiMitra`} component={GantiMitra}/>
			  <Route path={`${process.env.PUBLIC_URL}/FormAlamatPengguna`} component={FormAlamatPengguna}/>
			  <Route path={`${process.env.PUBLIC_URL}/FormAlamatPengguna/:alamat_pengguna_id`} component={FormAlamatPengguna}/>
			  <Route path={`${process.env.PUBLIC_URL}/keranjang`} component={keranjang}/>
			  <Route path={`${process.env.PUBLIC_URL}/verifikasi`} component={verifikasi}/>
			  <Route path={`${process.env.PUBLIC_URL}/tentang`} component={tentang}/>
			  <Route path={`${process.env.PUBLIC_URL}/mitra`} component={Mitra}/>
			  <Route path={`${process.env.PUBLIC_URL}/pengajuan-mitra`} component={PengajuanMitra}/>
			  <Route path={`${process.env.PUBLIC_URL}/petunjuk-transaksi`} component={PetunjukTransaksi}/>
			  <Route path={`${process.env.PUBLIC_URL}/syarat-ketentuan`} component={SyaratKetentuan}/>
			  <Route path={`${process.env.PUBLIC_URL}/faq`} component={Faq}/>
			  <Route path={`${process.env.PUBLIC_URL}/kategori`} component={kategori}/>
			  <Route path={`${process.env.PUBLIC_URL}/checkout/:pengguna_id`} component={Checkout}/>
			  <Route path={`${process.env.PUBLIC_URL}/batalTransaksi/:transaksi_id`} component={batalTransaksi}/>
			  <Route path={`${process.env.PUBLIC_URL}/KonfirmasiDiterima/:transaksi_id`} component={KonfirmasiDiterima}/>
			  <Route path={`${process.env.PUBLIC_URL}/pembayaran/:transaksi_id`} component={Pembayaran}/>
			  <Route path={`${process.env.PUBLIC_URL}/KonfirmasiPembayaran/:transaksi_id`} component={KonfirmasiPembayaran}/>
			  <Route path={`${process.env.PUBLIC_URL}/pembelian`} component={Pembelian}/>
			  <Route path={`${process.env.PUBLIC_URL}/penjualan`} component={Penjualan}/>
			  <Route path={`${process.env.PUBLIC_URL}/tampilProduk/:produk_id`} component={tampilProduk}/>
			  <Route path={`${process.env.PUBLIC_URL}/produk/:kategori_produk_id`} component={produk}/>
			  <Route path={`${process.env.PUBLIC_URL}/blog-left-sidebar`} component={BlogLeftSidebar}/>
			  <Route path={`${process.env.PUBLIC_URL}/blog-right-sidebar`} component={BlogRightSidebar}/>
			  <Route path={`${process.env.PUBLIC_URL}/blog-leftside`} component={BlogLeftside}/>
			  <Route path={`${process.env.PUBLIC_URL}/blog-rightside`} component={BlogRightside}/>
			  <Route path={`${process.env.PUBLIC_URL}/sign-in`} component={SignIn}/>
			  <Route path={`${process.env.PUBLIC_URL}/sign-up`} component={SignUp}/>
			  <Route path={`${process.env.PUBLIC_URL}/forget-password`} component={ForgetPassword}/>
			  <Route path={`${process.env.PUBLIC_URL}/thank-you`} component={ThankYou}/>
			  <Route path={`${process.env.PUBLIC_URL}/review`} component={Review}/>
			  <Route path={`${process.env.PUBLIC_URL}/404`} component={PageNotFound}/>
			  <Route path={`${process.env.PUBLIC_URL}/faq`} component={Faq}/>
			  <Route path={`${process.env.PUBLIC_URL}/download`} component={Download}/>
			  <Route path={`${process.env.PUBLIC_URL}/coming-soon`} component={ComingSoon}/>
			  <Route path={`${process.env.PUBLIC_URL}/blog-details`} component={BlogDetails}/>
			  <Route component={NoMatch} />
			</Switch>
		</BrowserRouter>
  	);
  }
 }

ReactDOM.render(<Provider store={store}><Root /></Provider>, document.getElementById('root'));

registerServiceWorker();

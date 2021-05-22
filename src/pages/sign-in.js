import React from 'react';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as Actions from '../store/actions';

import DatePicker from 'react-datepicker';

import "react-datepicker/dist/react-datepicker.css";
import 'react-datepicker/dist/react-datepicker-cssmodules.css';

import { css } from "@emotion/core";
import BounceLoader from "react-spinners/BounceLoader";

import Modal from 'react-modal';


class SignIn extends React.Component {

   state = {
      redirect_produk: false,
      routeParams: {},
      loading: false,
      teks_alert: '',
      tampil_alert: false,
      warna_alert: 'green'
   }

   getParameterByName = (name, url = this.props.location.search) => {
      name = name.replace(/[\[\]]/g, '\\$&');
      var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
          results = regex.exec(url);
      if (!results) return null;
      if (!results[2]) return '';
      return decodeURIComponent(results[2].replace(/\+/g, ' '));
   }

   componentDidMount() {

      // console.log(this.getParameterByName('redirect'))
      // console.log(this.props.location.search.replace("?","").split("&")[0].)

      if(this.getParameterByName('redirect')){
         //ada redirectnya
         this.setState({
            redirect_produk: true
         })
      }else{
         //nggak ada
      }

      setTimeout(function () {
         document.querySelector(".loader-wrapper").style = "display: none";
      }, 2000);
   }

   setValue = (tipe) => (e) => {
      this.setState({
         routeParams: {
            ...this.state.routeParams,
            [tipe]: e.currentTarget.value
         }
      },()=>{
         console.log(this.state.routeParams)
      })
   }

   login = () => {
      if(
         !this.state.routeParams.username ||
         !this.state.routeParams.password
      ){
         // Alert('Mohon lengkapi username dan password sebelum login!', 'Peringatan')
         this.setState({
            tampil_alert: true,
            warna_alert: 'red',
            teks_alert: 'Mohon lengkapi username dan password sebelum login!'
         })
         return true
      }
      // alert('tes')
      this.setState({
         loading: true
      },()=>{
         this.props.masuk(this.state.routeParams).then((result)=>{
            this.setState({
               loading: true
            },()=>{
               if(!result.payload.error){
                  //berhasil login
                  this.props.getPengguna({pengguna_id: result.payload.user.pengguna_id}).then((resultPengguna)=>{
                     
                     // Alert('Selamat Datang!', 'Berhasil Login')

                     this.setState({
                        loading: false,
                        tampil_alert: true,
                        warna_alert: 'green',
                        teks_alert: 'Berhasil Login. Selamat Datang!'
                     })
                     
                     setTimeout(() => {
                        localStorage.setItem('sudah_login',1)
                        localStorage.setItem('user',JSON.stringify(resultPengguna.payload.rows[0]))
   
                        setTimeout(() => {
                           if(this.getParameterByName('redirect')){
                              this.props.history.push(this.getParameterByName('redirect'))
                           }else{
                              this.props.history.push('/')
                           }
                        }, 2000);

                        // this.props.history.push('/')
                     }, 1500)

                  })

               }else{
                  // Alert(result.payload.error, 'Peringatan')
                  this.setState({
                     loading: false,
                     tampil_alert: true,
                     warna_alert: 'red',
                     teks_alert: result.payload.error
                  })
                  return true
               }
            })
         })
      })
   }

   render() {

      return (
         <section className="authentication-form" style={{paddingTop:'32px'}}>
            <div className="innerpage-decor">
               <div className="innerpage-circle1"><img src="assets/images/Testimonial2.png" alt="" /></div>
               <div className="innerpage-circle2"><img src="assets/images/Testimonial1.png" alt="" /></div>
            </div>
            <Modal
               isOpen={this.state.loading}
               contentLabel="Example Modal"
               style={{
                  content : {
                     top                   : '50%',
                     left                  : '50%',
                     right                 : 'auto',
                     bottom                : 'auto',
                     marginRight           : '-50%',
                     transform             : 'translate(-50%, -50%)',
                     minHeight             : '225px',
                     minWidth              : '194px',
                     borderRadius          : '20px',
                     background            : 'rgb(255,255,255,0.8)',
                     border                : '1px solid #eee',
                     textAlign             : 'left'
                  }
               }}
            >
               <BounceLoader color={"#47B161"} loading={true} size={150} />
               <div style={{marginTop:'170px', width:'100%', textAlign:'center', color:'#434343'}}>
                  Memuat...
               </div>
            </Modal>
            <div>
               <div style={{width:'100%', textAlign:'center', marginBottom:'8px'}}>
                  <a className="navbar-brand" href={`${process.env.PUBLIC_URL}/`}><img src="/assets/images/illo-logo.png" alt="logo" style={{width:'100px'}} /></a>
               </div>
               <h2 className="title text-center"><span>Selamat Datang!</span></h2>
               {this.state.redirect_produk &&
               <p className="text-center">Silakan Login sebelum melanjutkan pembelian Anda, atau <a style={{color:'#434343', fontWeight:'bold'}} href={"/daftar"+(this.state.redirect_produk ? this.props.location.search : '')}>daftar</a> bila Anda belum memiliki akun</p>
               }
               {!this.state.redirect_produk &&
               <p className="text-center">Silakan Login menggunakan akun Anda, atau <a style={{color:'#434343', fontWeight:'bold'}} href="/daftar">daftar</a> bila Anda belum memiliki akun</p>
               }
               {this.state.tampil_alert &&
               <div className="card card20" style={{padding:'16px', marginBottom:'16px', background:(this.state.warna_alert === 'green' ? '#81c784' : 'red'), color:'white'}}>
                  <div className="row">
                     <div className="col-md-8 col-lg-8 blog-sec">
                           {this.state.teks_alert}
                     </div>
                     <div className="col-md-4 col-lg-4 blog-sec" style={{textAlign:'right'}}>
                           <button className="btn" style={{background:'transparent', color:'white'}} onClick={()=>this.setState({tampil_alert:false})}>Tutup</button>
                     </div>
                  </div>
               </div>
               }
               <div className="card">
                  <div className="theme-form">
                     <div className="form-group">
                        <input onChange={this.setValue('username')} type="text" className="form-control" placeholder="Alamat Email atau No. Whatsapp" required="required" value={this.state.routeParams.username} />
                     </div>
                     <div className="form-group">
                        <input onChange={this.setValue('password')} required="" name="login[password]" type="password" className="form-control" placeholder="Password" value={this.state.routeParams.password} />
                        <div className="show-hide">
                           <span className="show"></span>
                        </div>
                     </div>
                     <div className="form-group row">
                        <div className="custom-control custom-checkbox col-6">
                           <input type="checkbox" className="custom-control-input" id="customControlAutosizing" />
                           <label className="custom-control-label" htmlFor="customControlAutosizing">Ingat saya</label>
                        </div>
                        <a href={`${process.env.PUBLIC_URL}/forget-password`} className="text-right col-6 theme-link">Lupa password?</a>
                     </div>
                     <div className="form-button text-center">
                        <button onClick={this.login} className="btn btn-custom btn-lg theme-color">Login</button>
                     </div>
                     <br/>
                     <div style={{width:'100%', textAlign:'center'}}>
                        <div className="or-saparator"><span>atau</span></div>
                        <a className="btn btn-custom" href={"/daftar"+(this.getParameterByName('redirect') ? '?redirect='+this.getParameterByName('redirect') : '')} style={{color:'#ffffff'}}>Daftar</a>
                        {/* <br/> */}
                        <div className="or-saparator"><span>&nbsp;</span></div>
                        
                        <a href="/" style={{color:'#434343'}}>Kembali ke Beranda</a>
                     </div>
                     {/* <div className="or-saparator"><span>atau</span></div>
                     <h6 className="text-center mt-0 mb-3">Login dengan:</h6>
                     <div className="form-button text-center social-btns">
                     <button type="submit" className="btn btn-custom ggl">Google</button>
                  </div> */}
                  </div>
               </div>
               
            </div>
         </section>
      );
   }
}


function mapDispatchToProps(dispatch) {
   return bindActionCreators({
     masuk: Actions.masuk,
     getPengguna: Actions.getPengguna
   }, dispatch);
}

// export default SignIn;
export default (connect(null, mapDispatchToProps)(SignIn));
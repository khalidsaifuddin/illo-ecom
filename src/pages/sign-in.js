import React from 'react';


class SignIn extends React.Component {

   componentDidMount() {
      setTimeout(function () {
         document.querySelector(".loader-wrapper").style = "display: none";
      }, 2000);
   }

   render() {

      return (
         <section className="authentication-form" style={{paddingTop:'32px'}}>
            <div className="innerpage-decor">
               <div className="innerpage-circle1"><img src="assets/images/Testimonial2.png" alt="" /></div>
               <div className="innerpage-circle2"><img src="assets/images/Testimonial1.png" alt="" /></div>
            </div>
            <div>
               <div style={{width:'100%', textAlign:'center', marginBottom:'8px'}}>
                  <a className="navbar-brand" href={`${process.env.PUBLIC_URL}/`}><img src="/assets/images/illo-logo.png" alt="logo" style={{width:'100px'}} /></a>
               </div>
               <h2 className="title text-center"><span> Login Pengguna</span></h2>
               <p className="text-center">Silakan Login menggunakan akun Anda, atau <a href="/daftar">daftar</a> bila Anda belum memiliki akun</p>
               <div className="card">
                  <form className="theme-form">
                     <div className="form-group">
                        <input type="email" className="form-control" placeholder="email address" required="required" />
                     </div>
                     <div className="form-group">
                        <input required="" name="login[password]" type="password" className="form-control" placeholder="Password" />
                        <div className="show-hide">
                           <span className="show"></span>
                        </div>
                     </div>
                     <div className="form-group row">
                        <div className="custom-control custom-checkbox col-6">
                           <input type="checkbox" className="custom-control-input" id="customControlAutosizing" />
                           <label className="custom-control-label" htmlFor="customControlAutosizing">Remember me</label>
                        </div>
                        <a href={`${process.env.PUBLIC_URL}/forget-password`} className="text-right col-6 theme-link">lost your password</a>
                     </div>
                     <div className="form-button text-center">
                        <button type="submit" className="btn btn-custom btn-lg theme-color">Login</button>
                     </div>
                     <div className="or-saparator"><span>or</span></div>
                     <h6 className="text-center mt-0 mb-3">Sign in with:</h6>
                     <div className="form-button text-center social-btns">
                        <button type="submit" className="btn btn-custom fb">Facebook</button>
                        <button type="submit" className="btn btn-custom ggl">Google</button>
                     </div>
                  </form>
               </div>
            </div>
         </section>
      );
   }
}


export default SignIn;
import React from 'react';


class Footer extends React.Component {
  
  componentWillMount() {
        (function(d, s, id) {
        var js, fjs = d.getElementsByTagName(s)[0];
        if (d.getElementById(id)) return;
        js = d.createElement(s); js.id = id;
        js.src = 'https://connect.facebook.net/en_US/sdk/xfbml.customerchat.js#xfbml=1&version=v2.12&autoLogAppEvents=1';
        fjs.parentNode.insertBefore(js, fjs);
        }(document, 'script', 'facebook-jssdk'));
    }

  render() {
		
  	return (
      <div>
    		<section className="p-0">
           <div className="container-fluid">
           <div className="bottom-section">
              <div className="row">
                 <div className="col-md-12 p-0">
                    <div className="address-bar">
                       <div>
                          {/* Buka Aplikasi Sekarang */}
                          <a href={"https://app.diskuis.id/"} className="btn btn-custom theme-color" role="button" style={{background:'#DF6321', marginBottom:'8px', fontSize:'30px'}} >
                              Buka Aplikasi <b>Diskuis</b> Sekarang
                           </a>
                          {/* <ul className="footer-style">
                             <li>
                                <div className="footer-icon">
                                   <img src="assets/images/locate.png" alt="locate" />
                                </div>
                                <div className="footer-address">
                                   <a href={null}>Diskuis</a>
                                </div>
                             </li>
                             <li>
                                <div className="footer-icon">
                                   <img src="assets/images/telephone.png" alt="telephone" />
                                </div>
                                <div className="footer-address">
                                    <a href={null}>admin@diskuis.id</a>
                                </div>
                             </li>
                             <li>
                                <div className="footer-icon">
                                   <img src="assets/images/fax.png" alt="" />
                                </div>
                                <div className="footer-address">
                                    <a href={null}>---</a>
                                </div>
                             </li>
                          </ul> */}
                       </div>
                    </div>
                 </div>
                 {/* <div className="col-md-6 p-0">
                    <iframe title="google-map" src="https://www.google.com/maps/embed?pb=!1m10!1m8!1m3!1d35391.48685150366!2d72.77537852898678!3d21.18930639680146!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sin!4v1530610361925" allowFullScreen className="md-height"></iframe>
                 </div> */}
              </div>
           </div>
           </div>
        </section>

        <div className="copyright-section index-footer">
           <p>2020 copyright by Diskuis</p>
        </div>

        <div className="tap-top">
           <div>
              <i className="fa fa-angle-double-up"></i>
           </div>
        </div>
        <div id="fb-root"></div>
        {/*Your customer chat code*/}
          <div className="fb-customerchat"
              page_id="2123438804574660"
              theme_color="#18e7d3"
              logged_in_greeting="Hi! Welcome to PixelStrap Themes  How can we help you?"
              logged_out_greeting="Hi! Welcome to PixelStrap Themes  How can we help you?">
          </div>
      </div>
  	);
  }
}


export default Footer;
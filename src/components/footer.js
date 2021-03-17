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
                    <div className="address-bar" style={{background:'#cccccc', display:'block', paddingTop:'16px'}}>
                       {/* <div style={{textAlign:'left'}}>
                          mantab
                       </div> */}
                       <div className="container">
                           <div className="row">
                              <div className="col-sm-4">
                                 Footer column 1
                              </div>
                              <div className="col-sm-4">
                                 Footer column 2
                              </div>
                              <div className="col-sm-4" style={{textAlign:'right'}}>
                                 Footer column 3
                              </div>
                           </div>
                        </div>
                    </div>
                 </div>
              </div>
           </div>
           </div>
        </section>

        <div className="copyright-section index-footer">
           <p>2021 copyright by Illo</p>
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
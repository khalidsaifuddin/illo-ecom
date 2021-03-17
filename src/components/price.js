import React from 'react';
import OwlCarousel from 'react-owl-carousel';


class Price extends React.Component {
    componentDidMount() {
        setTimeout(function () {
            document.querySelector(".loader-wrapper").style = "display: none";
        }, 2000);
    }
    render() {
        // OwlCarousel Option for Prices
        const options = {
            0: {
                items: 1,
                dots: true,
                margin: 5,
            },
            600: {
                items: 1,
                dots: true,
                margin: 0,
            },
            768: {
                items: 2,
                dots: true,
            },
            992: {
                items: 3,
            },
            1000: {
                items: 3
            }
        };

        // Dynamic Price Data Easy to Update
        let data = [
            { 
                title: 'Free', 
                lable: 'Fitur standar bagi pengguna gratis', 
                button1: '<br/>Gratis<br/>&nbsp;', 
                price: '0', 
                features: (
                <div>
                    <li>Ruang yang dapat dibuat<br/><b>max 10</b></li>
                    <li>Kuis yang dapat dibuat<br/><b>max 15</b></li>
                    <li>Sesi kuis yang dapat dibuat<br/><b>max 5/kuis</b></li>
                    <li>Materi & Diskusi yang dapat dibuat<br/><b>Tidak terbatas</b></li>
                    <li>Ruang Privat<br/>(❌)</li>
                    <li>Kuis Privat<br/>(❌)</li>
                    <li>Laporan dan Analisis Detail Ruang<br/>(❌)</li>
                    <li>Laporan dan Analisis Detail Kuis<br/>(❌)</li>
                    <li>Manajemen Sekolah<br/>(❌)</li>
                    <li>Kelola Data Guru<br/>(❌)</li>
                    <li>Absensi Guru<br/>(❌)</li>
                    <li>Kelola Data Siswa<br/>(❌)</li>
                    <li>Absensi Siswa<br/>(❌)</li>
                    <li>Update fitur VIP rutin<br/>(❌)</li>
                </div>
                ), 
                link: '#' },
            { 
                title: 'VIP Personal', 
                lable: 'Fitur lengkap untuk pengguna personal', 
                button1: '<s style="font-size:10px;font-weight:normal;">Rp 25.000/bulan</s><br/>Rp 15.000/bulan<br/>&nbsp;', 
                button2: '<s style="font-size:10px;font-weight:normal;">Rp 75.000/3 bulan</s><br/>Rp 45.000/3 bulan<br/>&nbsp;', 
                button3: '<s style="font-size:10px;font-weight:normal;">Rp 150.000/ 6 bulan</s><br/>Rp 75.000/6 bulan<br/>&nbsp;', 
                button4: '<s style="font-size:10px;font-weight:normal;">Rp 300.000/ 12 bulan</s><br/>Rp 100.000/12 bulan<br/>&nbsp;', 
                price: '15.000', 
                features: (
                <div>
                    <li>Ruang yang dapat dibuat<br/><b>tidak terbatas</b></li>
                    <li>Kuis yang dapat dibuat<br/><b>tidak terbatas</b></li>
                    <li>Sesi kuis yang dapat dibuat<br/><b>tidak terbatas/kuis</b></li>
                    <li>Materi & Diskusi yang dapat dibuat<br/><b>Tidak terbatas</b></li>
                    <li>Ruang Privat<br/>(✅)</li>
                    <li>Kuis Privat<br/>(✅)</li>
                    <li>Laporan dan Analisis Detail Ruang<br/>(✅)</li>
                    <li>Laporan dan Analisis Detail Kuis<br/>(✅)</li>
                    <li>Manajemen Sekolah<br/>(❌)</li>
                    <li>Kelola Data Guru<br/>(❌)</li>
                    <li>Absensi Guru<br/>(❌)</li>
                    <li>Kelola Data Siswa<br/>(❌)</li>
                    <li>Absensi Siswa<br/>(❌)</li>
                    <li>Update fitur VIP rutin<br/>(✅)</li>
                </div>
                ), 
                link: '#' },
            { 
                title: 'VIP Sekolah', 
                lable: 'Fitur lengkap untuk sekolah', 
                button1: '<s style="font-size:10px;font-weight:normal;">Rp 15.000/bulan</s><br/>Per guru <br/>Rp 10.000/bulan<br/><span style="font-weight:normal;font-size:10px;">(minimal 10 guru)</span>', 
                button2: '<s style="font-size:10px;font-weight:normal;">Rp 45.000/3 bulan</s><br/>Per guru <br/>Rp 30.000/3 bulan<br/><span style="font-weight:normal;font-size:10px;">(minimal 10 guru)</span>', 
                button3: '<s style="font-size:10px;font-weight:normal;">Rp 90.000/ 6 bulan</s><br/>Per guru <br/>Rp 50.000/6 bulan<br/><span style="font-weight:normal;font-size:10px;">(minimal 10 guru)</span>', 
                button4: '<s style="font-size:10px;font-weight:normal;">Rp 180.000/ 12 bulan</s><br/>Per guru <br/>Rp 80.000/12 bulan<br/><span style="font-weight:normal;font-size:10px;">(minimal 10 guru)</span>', 
                price: '10.000', 
                features: (
                <div>
                    <li>Ruang yang dapat dibuat<br/><b>tidak terbatas</b></li>
                    <li>Kuis yang dapat dibuat<br/><b>tidak terbatas</b></li>
                    <li>Sesi kuis yang dapat dibuat<br/><b>tidak terbatas/kuis</b></li>
                    <li>Materi & Diskusi yang dapat dibuat<br/><b>Tidak terbatas</b></li>
                    <li>Ruang Privat<br/>(✅)</li>
                    <li>Kuis Privat<br/>(✅)</li>
                    <li>Laporan dan Analisis Detail Ruang<br/>(✅)</li>
                    <li>Laporan dan Analisis Detail Kuis<br/>(✅)</li>
                    <li>Manajemen Sekolah<br/>(✅)</li>
                    <li>Kelola Data Guru<br/>(✅)</li>
                    <li>Absensi Guru<br/>(✅)</li>
                    <li>Kelola Data Siswa<br/>(✅)</li>
                    <li>Absensi Siswa<br/>(✅)</li>
                    <li>Update fitur VIP rutin<br/>(✅)</li>
                </div>
                ), 
                link: '#' }
        ];

        // Dynamic Price Data Loop
        let DataList = data.map((val, i) => {
            return (
                <div className="price-item" key={i}>
                    <div className="price-block">
                        <div className="price-type">
                            <h2 style={{color:'#DF6321'}}>{val.title}</h2>
                        </div>
                        <div className="mrp">
                            <h6 className="user-type">{val.lable}</h6>
                            <div className="price-devide"></div>
                            <h2>Rp&nbsp;{val.price}</h2>
                            <h6 className="price-year">per bulan {val.title === 'VIP Sekolah' && 'per guru (minimal 10 guru)'}</h6>
                            <div className="price-devide"></div>
                        </div>
                        <ul className="price-feature">
                            {val.features}
                        </ul>
                        {/* <ul className="price-feature" dangerouslySetInnerHTML={{ __html: val.features }}></ul> */}
                        <a href={val.link} className="btn btn-custom theme-color" role="button" style={{background:'#DF6321', marginBottom:'8px'}} >
                            <span dangerouslySetInnerHTML={{ __html: val.button1 }}></span>
                        </a>
                        {val.button2 &&
                        <a href={val.link} className="btn btn-custom theme-color" role="button" style={{background:'#DF6321', marginBottom:'8px'}} >
                            <span dangerouslySetInnerHTML={{ __html: val.button2 }}></span>
                        </a>
                        }
                        {val.button3 &&
                        <a href={val.link} className="btn btn-custom theme-color" role="button" style={{background:'#DF6321', marginBottom:'8px'}} >
                            <span dangerouslySetInnerHTML={{ __html: val.button3 }}></span>
                        </a>
                        }
                        {val.button4 &&
                        <a href={val.link} className="btn btn-custom theme-color" role="button" style={{background:'#DF6321', marginBottom:'8px'}} >
                            <span dangerouslySetInnerHTML={{ __html: val.button4 }}></span>
                        </a>
                        }
                    </div>
                </div>
            );
        });

        return (
            <section id="price" className="price">
                <div className="container">
                    <div className="row">
                        <div className="col-sm-12">
                            <OwlCarousel
                                className="price-carousel owl-carousel owl-theme"
                                loop={true}
                                margin={30}
                                nav={false}
                                dots={false}
                                responsive={options}
                            >
                                {DataList}
                            </OwlCarousel>
                        </div>
                    </div>
                </div>
            </section>
        );
    }
}


export default Price;
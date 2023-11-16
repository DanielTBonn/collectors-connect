import Navbar from './Navbar';

const styles = {
    header: {
        width: "100%",
        height: "125px",
        overflow: "hidden",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundImage: "url(../../assets/eran-menashri-Ae7pSsfzEHs-unsplash.jpg)",
        position: "absolute",
        top: "-50px",
    },
}


function Header() {
    return (
      <div className="header d-flex align-items-center">
        <div className="background-image" style={styles.header}></div>
        <div className="container text-center">
          <div>
            <Navbar />
          </div>
        </div>
      </div>
    );
  }
  
  export default Header;
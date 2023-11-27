import Navbar from './Navbar';

const styles = {
    header: {
        width: "100%",
        height: "125px",
        overflow: "hidden",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundImage: "url(../../assets/eran-menashri-Ae7pSsfzEHs-unsplash.jpg)",
        position: "relative",
        backgroundPosition: "center 23%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
    },
}

function Header() {
    return (
      <div style={styles.header}>
        <div className="container text-center">
            <Navbar />
        </div>
      </div>
    );
  }
  
  export default Header;
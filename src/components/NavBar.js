import './NavBar.css'
import { connect } from 'react-redux';

const NavBar = (props) =>{
    const isAdmin = props;
    return(
        <nav className='navbar'>
            <ul>
                <li><a href="/">Home</a></li>
                <li><a href="/#/upload">Upload</a></li>
                <li><a href="/#/signin">Sign In</a></li>
                <li><a href="/#/contact">Contact</a></li>
                {isAdmin.isAdmin ? (<li><a href="/#/admin">Admin</a></li>) : (null)}
            </ul>
        </nav>
    );
}
const mapStateToProps = (state) => ({
    isAdmin: state.auth.isAdmin,
  });
  
  export default connect(mapStateToProps)(NavBar);
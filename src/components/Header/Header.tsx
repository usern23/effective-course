import classes from './Header.module.css';
import logoMarvel from '../../assets/marvelredlogo.png'
function Header() {
    return (
        <header className={classes.header}>
            <div className={classes.container}>
                <img src={logoMarvel} className={classes.image} alt="logo-marvel" />
                <div className={classes.menu_container}>
                </div>
            </div>
        </header>
    );
}

export default Header;
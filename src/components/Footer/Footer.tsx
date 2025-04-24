import { useTranslation } from 'react-i18next';
import classes from './Footer.module.css';
import logoMarvel from "../../assets/marvelblacklogo.jpg";

function Footer() {
    const CURRENT_YEAR: number = new Date().getFullYear();
    const { t } = useTranslation();
    
    return (
        <footer className={classes.footer}>
            <div className={classes.container}>
                <div className={classes.content}>
                    <img src={logoMarvel} className={classes.image} alt="Marvel Logo" />
                    <div className={classes.text}>
                        <p>{t('footer.dataCopyright', { year: CURRENT_YEAR })}</p>
                        <a href="https://developer.marvel.com" target="_blank" rel="noopener noreferrer">developer.marvel.com</a>
                    </div>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
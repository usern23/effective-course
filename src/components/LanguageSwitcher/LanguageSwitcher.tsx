import { useTranslation } from 'react-i18next';
import classes from './LanguageSwitcher.module.css';
import translateIcon from '../../assets/translate.svg';

const LanguageSwitcher = () => {
  const { i18n } = useTranslation();
  
  const toggleLanguage = () => {
    const currentLang = i18n.language;
    const newLang = currentLang === 'en' ? 'ru' : 'en';
    i18n.changeLanguage(newLang);
  };

  return (
    <div className={classes.languageSwitcher}>
      <button 
        className={classes.langButton} 
        onClick={toggleLanguage}
        title={i18n.language === 'en' ? 'Switch to Russian' : 'Переключить на английский'}
      >
        <img src={translateIcon} alt="Translate" className={classes.translateIcon} />
      </button>
    </div>
  );
};

export default LanguageSwitcher; 
import styles from './UserProfileForm.module.css';
import defaultCoverPic from 'assets/images/default-cover-pic.jpg';
import defaultProfilePic from 'assets/images/default-profile-pic.jpg';
import IconInfo from 'components/Icons/IconInfo';
import IconMapPin from 'components/Icons/IconMapPin';
import IconPhone from 'components/Icons/IconPhone';
import IconLinkedin from 'components/Icons/IconLinkedin';
import IconCalendar from 'components/Icons/IconCalendar';
import IconEdit from 'components/Icons/IconEdit';
import { set, useForm } from 'react-hook-form';
import { useEffect, useState } from 'react';

const UserProfileForm = ({ userProfile }) => {
  const [isLoading, setLoading] = useState(false);
  const [responseErrorMsg, setResponseErrorMsg] = useState([]);
  const [profilePicPreview, setProfilePicPreview] = useState(null);
  const [coverPicPreview, setCoverPicPreview] = useState(null);
  const [profilePicDeleted, setProfilePicDeleted] = useState(false);
  const [coverPicDeleted, setCoverPicDeleted] = useState(false);
  const validationSchema = true;
  const imagesUrl = process.env.REACT_APP_IMAGES_URL;
  const {
    firstname,
    lastname,
    profilePicPath,
    coverPicPath,
    profession,
    birthDate,
    city,
    phoneNumber,
    linkedinUrl,
    bio
  } = userProfile;
  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    setFocus,
    reset,
    formState: { errors }
  } = useForm({ mode: 'onSubmit' });

  const adjustTextareaHeight = (e) => {
    e.target.style.height = '1px';
    e.target.style.height = e.target.scrollHeight + 'px';
  };

  useEffect(() => {
    setResponseErrorMsg([]);
    profilePicPath && setProfilePicPreview(`${imagesUrl}/${profilePicPath}`);
    coverPicPath && setCoverPicPreview(`${imagesUrl}/${coverPicPath}`);
    setValue('lastname', lastname);
    setValue('firstname', firstname);
    setValue('profession', profession);
    setValue('birthDate', birthDate);
    setValue('city', city);
    setValue('phoneNumber', phoneNumber);
    setValue('linkedinUrl', linkedinUrl);
    setValue('bio', bio);
    setFocus('bio');
    setFocus('lastname');
  }, [userProfile]);

  return (
    <form className={styles.UserProfileForm}>
      <label htmlFor='coverPicInput'>
        <img className={styles.coverPic} src={defaultCoverPic} alt='Photo de couverture' />
      </label>
      <input className='form-file-input' id='coverPicInput' type='file' />
      <div className={styles.infosContainer}>
        <div className={styles.infosRow}>
          <div className={styles.infosColumn}>
            <label className={styles.profilePicLabel} htmlFor='profilePicInput'>
              <img className={styles.profilePic} src={defaultProfilePic} alt='' />
            </label>
            <input className='form-file-input' id='profilePicInput' type='file' />
            <input
              className={`form-input ${styles.infosInput} ${errors.lastname ? 'error' : ''}`}
              type='text'
              placeholder='Nom'
              {...register('lastname', { validate: validationSchema.lastname })}
            />
            <input
              className={`form-input ${styles.infosInput} ${errors.firstname ? 'error' : ''}`}
              type='text'
              placeholder='Prénom'
              {...register('firstname', { validate: validationSchema.firstname })}
            />
            <input
              className={`form-input ${styles.infosInput} ${errors.profession ? 'error' : ''}`}
              type='text'
              placeholder='Profession'
              {...register('profession', { validate: validationSchema.profession })}
            />
          </div>

          <div className={styles.infosColumn}>
            <div className={styles.infoItem}>
              <IconMapPin size={20} />{' '}
              <input
                className={`form-input ${styles.infosInput} ${errors.city ? 'error' : ''}`}
                type='text'
                placeholder='Ville'
                {...register('city', { validate: validationSchema.city })}
              />
            </div>

            <div className={styles.infoItem}>
              <IconCalendar size={20} />
              <input
                className={`form-input ${styles.infosInput} ${errors.birthDate ? 'error' : ''}`}
                type='date'
                placeholder="Date d'anniversaire"
                {...register('birthDate', { validate: validationSchema.birthDate })}
              />
            </div>

            <div className={styles.infoItem}>
              <IconPhone size={20} />
              <input
                className={`form-input ${styles.infosInput} ${errors.phoneNumber ? 'error' : ''}`}
                type='number'
                placeholder='Numéro de téléphone'
                {...register('phoneNumber', { validate: validationSchema.phoneNumber })}
              />
            </div>

            <div className={styles.infoItem}>
              <IconLinkedin size={20} />
              <input
                className={`form-input ${styles.infosInput} ${errors.linkedinUrl ? 'error' : ''}`}
                type='text'
                placeholder='Lien Linkedin'
                {...register('linkedinUrl', { validate: validationSchema.linkedinUrl })}
              />
            </div>
          </div>

          <textarea
            className={`form-textarea ${styles.infosTextrea} ${errors.bio ? 'error' : ''}`}
            placeholder='Votre description'
            onInput={(e) => adjustTextareaHeight(e)}
            onFocus={(e) => adjustTextareaHeight(e)}
            {...register('bio', { validate: validationSchema.bio })}
          ></textarea>
        </div>
        <div className={styles.submitRow}>
          <IconInfo size='24' />
          <p className={styles.submitWarning}>
            Ces informations seront visibles par l'ensemble des utilisateurs.
            <br />
            Les seuls informations obligatoires sont le nom et le prénom.
          </p>
          <button className={`btn btn-primary-grey ${styles.saveBtn}`}>Enregistrer</button>
        </div>
        <IconEdit size='20' />
      </div>
    </form>
  );
};

export default UserProfileForm;

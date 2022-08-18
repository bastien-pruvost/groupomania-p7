import styles from './UserProfileForm.module.css';
import { useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { profileValidator } from 'utils/validationSchemas.utils';
import { adjustTextareaHeight } from 'utils/layout.utils';
import Loader from 'components/Loader';
import IconMapPin from 'components/Icons/IconMapPin';
import IconCalendar from 'components/Icons/IconCalendar';
import IconPhone from 'components/Icons/IconPhone';
import IconLinkedin from 'components/Icons/IconLinkedin';
import IconInfo from 'components/Icons/IconInfo';
import IconEdit from 'components/Icons/IconEdit';
import defaultCoverPic from 'assets/images/default-cover-pic.jpg';
import defaultProfilePic from 'assets/images/default-profile-pic.jpg';

const UserProfileForm = ({ userData, setEditMode, updateUserProfile, refreshPostsData }) => {
  const [isLoading, setLoading] = useState(false);
  const [responseErrorMsg, setResponseErrorMsg] = useState([]);
  const [coverPicPreview, setCoverPicPreview] = useState(null);
  const [profilePicPreview, setProfilePicPreview] = useState(null);
  const [coverPicDeleted, setCoverPicDeleted] = useState(false);
  const [profilePicDeleted, setProfilePicDeleted] = useState(false);
  const validationSchema = profileValidator;
  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors }
  } = useForm({ mode: 'onSubmit' });

  // share ref to adjust textarea height
  const textareaRef = useRef(null);
  const { ref, ...registerBioRest } = register('bio', { validate: validationSchema.bio });

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
  } = userData;

  const birthDay = birthDate ? birthDate.split('-')[2] : null;
  const birthMonth = birthDate ? birthDate.split('-')[1] : null;

  const coverPicUrl = coverPicPath
    ? `${process.env.REACT_APP_IMAGES_URL}/${coverPicPath}`
    : defaultCoverPic;

  const profilePicUrl = profilePicPath
    ? `${process.env.REACT_APP_IMAGES_URL}/${profilePicPath}`
    : defaultProfilePic;

  const limitBirthDay = (e) => {
    const dayValue = e.target.value;
    if (dayValue && dayValue > 31) {
      setValue('birthDay', 31);
    }
    if (dayValue && dayValue < 0) {
      setValue('birthDay', 1);
    }
  };

  const limitBirthMonth = (e) => {
    const monthValue = e.target.value;
    if (monthValue && monthValue > 12) {
      setValue('birthMonth', 12);
    }
    if (monthValue && monthValue < 0) {
      setValue('birthMonth', 1);
    }
  };

  const handleCoverPicInput = (e) => {
    if (e.target?.files?.[0]) {
      setCoverPicDeleted(false);
    } else {
      e.target.files = getValues('coverPic');
    }
    setCoverPicPreview(URL.createObjectURL(e.target.files[0]));
  };

  const handleProfilePicInput = (e) => {
    if (e.target?.files?.[0]) {
      setProfilePicDeleted(false);
    } else {
      e.target.files = getValues('profilePic');
    }
    setProfilePicPreview(URL.createObjectURL(e.target.files[0]));
  };

  const onSubmit = async (data) => {
    setResponseErrorMsg([]);
    setLoading(true);
    if (data.birthDay.length === 1) data.birthDay = `0${data.birthDay}`;
    const formatedBirthDate = `2000-${data.birthMonth}-${data.birthDay}`;
    const formData = new FormData();
    formData.append('lastname', data.lastname);
    formData.append('firstname', data.firstname);
    formData.append('profession', data.profession);
    formData.append('phoneNumber', data.phoneNumber);
    formData.append('linkedinUrl', data.linkedinUrl);
    formData.append('city', data.city);
    formData.append('birthDate', formatedBirthDate);
    formData.append('bio', data.bio);
    formData.append('coverPic', data.coverPic[0]);
    formData.append('profilePic', data.profilePic[0]);
    formData.append('coverPicDeleted', coverPicDeleted);
    formData.append('profilePicDeleted', profilePicDeleted);
    updateUserProfile(formData)
      .then(() => {
        setEditMode(false);
        refreshPostsData();
      })
      .catch((err) => setResponseErrorMsg(err))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    setResponseErrorMsg([]);
    setCoverPicPreview(coverPicUrl);
    setProfilePicPreview(profilePicUrl);
    setValue('lastname', lastname);
    setValue('firstname', firstname);
    setValue('profession', profession);
    setValue('birthDay', birthDay);
    setValue('birthMonth', birthMonth);
    setValue('city', city);
    setValue('phoneNumber', phoneNumber);
    setValue('linkedinUrl', linkedinUrl);
    setValue('bio', bio);
    adjustTextareaHeight(textareaRef.current);
  }, [userData]);

  return (
    <form className={styles.UserProfileForm} onSubmit={handleSubmit(onSubmit)}>
      <label className={styles.coverPicContainer} htmlFor='coverPic'>
        <img className={styles.coverPic} src={coverPicPreview} alt='Photo de couverture' />
        <div className={styles.coverPicButton}>
          <IconEdit size={22} />
        </div>
      </label>
      <input
        type='file'
        className='form-file-input'
        accept='image/*'
        id='coverPic'
        onInput={handleCoverPicInput}
        {...register('coverPic', { validate: validationSchema.image })}
      />
      <div className={styles.infosContainer}>
        <div className={styles.infosRow}>
          <div className={styles.infosColumn}>
            <label className={styles.profilePicContainer} htmlFor='profilePic'>
              <img className={styles.profilePic} src={profilePicPreview} alt='' />
              <div className={styles.profilePicButton}>
                <IconEdit size={20} />
              </div>
            </label>
            <input
              type='file'
              accept='image/*'
              id='profilePic'
              className='form-file-input'
              onInput={handleProfilePicInput}
              {...register('profilePic', { validate: validationSchema.image })}
            />

            <div className='form-group'>
              <label htmlFor='firstname' className='form-label'>
                Prénom
              </label>
              <input
                className={`form-input ${styles.infosInput} ${errors.firstname ? 'error' : ''}`}
                type='text'
                placeholder='Prénom'
                {...register('firstname', { validate: validationSchema.firstname })}
              />
              <span className='form-alert'>{errors.firstname?.message}</span>
            </div>

            <div className='form-group'>
              <label htmlFor='lastname' className='form-label'>
                Nom
              </label>
              <input
                className={`form-input ${styles.infosInput} ${errors.lastname ? 'error' : ''}`}
                type='text'
                placeholder='Nom'
                {...register('lastname', { validate: validationSchema.lastname })}
              />
              <span className='form-alert'>{errors.lastname?.message}</span>
            </div>

            <div className='form-group'>
              <label htmlFor='profession' className='form-label'>
                Profession
              </label>
              <input
                className={`form-input ${styles.infosInput} ${errors.profession ? 'error' : ''}`}
                type='text'
                placeholder='Profession'
                {...register('profession', { validate: validationSchema.profession })}
              />
              <span className='form-alert'>{errors.profession?.message}</span>
            </div>
          </div>

          <div className={styles.infosColumn}>
            <div className='form-group'>
              <label htmlFor='city' className='form-label'>
                Ville
              </label>
              <div className={styles.infoItem}>
                <IconMapPin size={20} />{' '}
                <input
                  className={`form-input ${styles.infosInput} ${errors.city ? 'error' : ''}`}
                  type='text'
                  placeholder='Ville'
                  {...register('city', { validate: validationSchema.city })}
                />
              </div>
              <span className='form-alert'>{errors.city?.message}</span>
            </div>

            <div className='form-group'>
              <label htmlFor='birthDay' className='form-label'>
                Date d'anniversaire
              </label>
              <div className={styles.infoItem}>
                <IconCalendar size={20} />
                <input
                  className={`form-input ${styles.infosInput} ${errors.birthDay ? 'error' : ''}`}
                  type='number'
                  min={1}
                  max={31}
                  onInput={limitBirthDay}
                  placeholder='Jour'
                  {...register('birthDay', { validate: validationSchema.birthDay })}
                />
                <input
                  className={`form-input ${styles.infosInput} ${errors.birthMonth ? 'error' : ''}`}
                  type='number'
                  min={1}
                  max={12}
                  onInput={limitBirthMonth}
                  placeholder='Mois'
                  {...register('birthMonth', { validate: validationSchema.birthMonth })}
                />
              </div>
              <span className='form-alert'>
                {errors.birthDay?.message} {errors.birthMonth?.message}
              </span>
            </div>

            <div className='form-group'>
              <label htmlFor='phoneNumber' className='form-label'>
                Numéro de téléphone
              </label>
              <div className={styles.infoItem}>
                <IconPhone size={20} />
                <input
                  className={`form-input ${styles.infosInput} ${errors.phoneNumber ? 'error' : ''}`}
                  type='number'
                  placeholder='Numéro de téléphone'
                  {...register('phoneNumber', { validate: validationSchema.phoneNumber })}
                />
              </div>
              <span className='form-alert'>{errors.phoneNumber?.message}</span>
            </div>

            <div className='form-group'>
              <label htmlFor='linkedinUrl' className='form-label'>
                Lien linkedin
              </label>
              <div className={styles.infoItem}>
                <IconLinkedin size={20} />
                <input
                  className={`form-input ${styles.infosInput} ${errors.linkedinUrl ? 'error' : ''}`}
                  type='text'
                  placeholder='Lien Linkedin'
                  {...register('linkedinUrl', { validate: validationSchema.linkedinUrl })}
                />
              </div>
              <span className='form-alert'>{errors.linkedinUrl?.message}</span>
            </div>
          </div>

          <div className='form-group'>
            <label htmlFor='bio' className='form-label'>
              Votre description
            </label>
            <textarea
              className={`form-textarea ${styles.infosTextarea} ${errors.bio ? 'error' : ''}`}
              placeholder='Votre description'
              onInput={(e) => adjustTextareaHeight(e.target)}
              {...registerBioRest}
              ref={(e) => {
                ref(e);
                textareaRef.current = e;
              }}
            />
            <span className='form-alert'>{errors.bio?.message}</span>
          </div>
        </div>

        {responseErrorMsg.length > 0 && (
          <ul className='alert alert-danger'>
            {responseErrorMsg.map((message, index) => (
              <li className='alert-li' key={index}>
                {message}
              </li>
            ))}
          </ul>
        )}

        <div className={styles.submitRow}>
          <div className={styles.submitWarning}>
            <IconInfo size='24' />
            <p>
              Ne renseignez que les informations que vous souhaitez partager aux autres
              utilisateurs.
            </p>
          </div>
          <div className={styles.buttonsContainer}>
            {isLoading && <Loader />}
            <button
              type='button'
              className='btn btn-secondary-grey'
              onClick={() => setEditMode(false)}
            >
              Annuler
            </button>
            <button className={`btn btn-primary-grey ${styles.saveBtn}`}>Enregistrer</button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default UserProfileForm;

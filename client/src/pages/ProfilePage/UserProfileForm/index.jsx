import styles from './UserProfileForm.module.css';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import IconMapPin from 'components/Icons/IconMapPin';
import IconCalendar from 'components/Icons/IconCalendar';
import IconPhone from 'components/Icons/IconPhone';
import IconLinkedin from 'components/Icons/IconLinkedin';
import IconInfo from 'components/Icons/IconInfo';
import defaultCoverPic from 'assets/images/default-cover-pic.jpg';
import defaultProfilePic from 'assets/images/default-profile-pic.jpg';

const UserProfileForm = ({ userData, setUserData, setEditMode, updateUserProfile }) => {
  const [isLoading, setLoading] = useState(false);
  const [responseErrorMsg, setResponseErrorMsg] = useState([]);
  const [coverPicPreview, setCoverPicPreview] = useState(null);
  const [profilePicPreview, setProfilePicPreview] = useState(null);
  const [coverPicDeleted, setCoverPicDeleted] = useState(false);
  const [profilePicDeleted, setProfilePicDeleted] = useState(false);
  const validationSchema = true;
  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    setFocus,
    formState: { errors }
  } = useForm({ mode: 'onSubmit' });
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

  const coverPicUrl = coverPicPath
    ? `${process.env.REACT_APP_IMAGES_URL}/${coverPicPath}`
    : defaultCoverPic;

  const profilePicUrl = profilePicPath
    ? `${process.env.REACT_APP_IMAGES_URL}/${profilePicPath}`
    : defaultProfilePic;

  const adjustTextareaHeight = (e) => {
    e.target.style.height = '1px';
    e.target.style.height = e.target.scrollHeight + 'px';
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
    const formData = new FormData();
    formData.append('lastname', data.lastname);
    formData.append('firstname', data.firstname);
    data.profession && formData.append('profession', data.profession);
    data.birthDate && formData.append('birthDate', data.birthDate);
    data.phoneNumber && formData.append('phoneNumber', data.phoneNumber);
    data.linkedinUrl && formData.append('linkedinUrl', data.linkedinUrl);
    data.city && formData.append('city', data.city);
    data.bio && formData.append('bio', data.bio);
    formData.append('coverPic', data.coverPic[0]);
    formData.append('profilePic', data.profilePic[0]);
    formData.append('coverPicDeleted', coverPicDeleted);
    formData.append('profilePicDeleted', profilePicDeleted);
    updateUserProfile(formData)
      .then((updatedProfile) => {
        setUserData(updatedProfile);
        setEditMode(false);
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
    setValue('birthDate', birthDate);
    setValue('city', city);
    setValue('phoneNumber', phoneNumber);
    setValue('linkedinUrl', linkedinUrl);
    setValue('bio', bio);
    setFocus('bio');
    setFocus('lastname');
  }, [userData]);

  return (
    <form className={styles.UserProfileForm} onSubmit={handleSubmit(onSubmit)}>
      <label htmlFor='coverPic'>
        <img className={styles.coverPic} src={coverPicPreview} alt='Photo de couverture' />
      </label>
      <input
        type='file'
        className='form-file-input'
        accept='image/*'
        id='coverPic'
        onInput={handleCoverPicInput}
        {...register('coverPic', { validate: validationSchema.coverPic })}
      />
      <div className={styles.infosContainer}>
        <div className={styles.infosRow}>
          <div className={styles.infosColumn}>
            <label className={styles.profilePicLabel} htmlFor='profilePic'>
              <img className={styles.profilePic} src={profilePicPreview} alt='' />
            </label>
            <input
              type='file'
              accept='image/*'
              id='profilePic'
              className='form-file-input'
              onInput={handleProfilePicInput}
              {...register('profilePic', { validate: validationSchema.profilePic })}
            />
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
            className={`form-textarea ${styles.infosTextarea} ${errors.bio ? 'error' : ''}`}
            placeholder='Votre description'
            onInput={(e) => adjustTextareaHeight(e)}
            onFocus={(e) => adjustTextareaHeight(e)}
            {...register('bio', { validate: validationSchema.bio })}
          ></textarea>
        </div>
        <div className={styles.submitRow}>
          <div className={styles.submitWarning}>
            <IconInfo size='24' />
            <p>
              Ne renseignez que les informations que vous souhaitez partager aux autres
              utilisateurs.
            </p>
          </div>
          <button className={`btn btn-primary-grey ${styles.saveBtn}`}>Enregistrer</button>
        </div>
      </div>
    </form>
  );
};

export default UserProfileForm;

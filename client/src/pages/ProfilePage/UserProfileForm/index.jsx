import styles from './UserProfileForm.module.css';
import randomPic from 'assets/images/random-pic.jpg';
import defaultProfilePic from 'assets/images/default-profile-pic.jpg';
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
  const [filePreview, setFilePreview] = useState(null);
  const [imageDeleted, setImageDeleted] = useState(false);
  const validationSchema = true;
  const imagesUrl = process.env.REACT_APP_IMAGES_URL;
  const {
    firstname,
    lastname,
    // profilePicPath,
    // coverPicPath,
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
      <img className={styles.cover_pic} src={randomPic} alt='Photo de couverture' />
      <div className={styles.description_flex}>
        <div className={styles.info_container}>
          <img className={styles.profile_pic} src={defaultProfilePic} alt='' />
          <input
            className={`form-input ${styles.infos_input} ${errors.lastname ? 'error' : ''}`}
            type='text'
            placeholder='Nom'
            {...register('lastname', { validate: validationSchema.lastname })}
          />
          <input
            className={`form-input ${styles.infos_input} ${errors.firstname ? 'error' : ''}`}
            type='text'
            placeholder='Prénom'
            {...register('firstname', { validate: validationSchema.firstname })}
          />
          <input
            className={`form-input ${styles.infos_input} ${errors.profession ? 'error' : ''}`}
            type='text'
            placeholder='Profession'
            {...register('profession', { validate: validationSchema.profession })}
          />
        </div>

        <div className={styles.info_container}>
          <div className={styles.info_item}>
            <IconMapPin size={20} />{' '}
            <input
              className={`form-input ${styles.infos_input} ${errors.city ? 'error' : ''}`}
              type='text'
              placeholder='Ville'
              {...register('city', { validate: validationSchema.city })}
            />
          </div>

          <div className={styles.info_item}>
            <IconCalendar size={20} />
            <input
              className={`form-input ${styles.infos_input} ${errors.birthDate ? 'error' : ''}`}
              type='date'
              placeholder="Date d'anniversaire"
              {...register('birthDate', { validate: validationSchema.birthDate })}
            />
          </div>

          <div className={styles.info_item}>
            <IconPhone size={20} />
            <input
              className={`form-input ${styles.infos_input} ${errors.phoneNumber ? 'error' : ''}`}
              type='number'
              placeholder='Numéro de téléphone'
              {...register('phoneNumber', { validate: validationSchema.phoneNumber })}
            />
          </div>

          <div className={styles.info_item}>
            <IconLinkedin size={20} />
            <input
              className={`form-input ${styles.infos_input} ${errors.linkedinUrl ? 'error' : ''}`}
              type='text'
              placeholder='Lien Linkedin'
              {...register('linkedinUrl', { validate: validationSchema.linkedinUrl })}
            />
          </div>
        </div>

        <textarea
          className={`form-textarea ${styles.infos_textarea} ${errors.bio ? 'error' : ''}`}
          placeholder='Votre description'
          onInput={(e) => adjustTextareaHeight(e)}
          onFocus={(e) => adjustTextareaHeight(e)}
          {...register('bio', { validate: validationSchema.bio })}
        ></textarea>
        <IconEdit size='20' />
      </div>
    </form>
  );
};

export default UserProfileForm;

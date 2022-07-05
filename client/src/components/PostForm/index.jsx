import styles from './PostForm.module.css';
import PostContainer from 'components/PostContainer';
import { useEffect, useState } from 'react';
// import { UserContext } from 'contexts/UserContext';
import { useForm } from 'react-hook-form';
import { postValidation } from 'utils/validationSchemas.utils';
import defaultProfilePic from 'assets/images/default-profile-pic.jpg';

const PostForm = () => {
  // const { currentUser } = useContext(UserContext);
  const [isLoading, setLoading] = useState(false);
  const [responseErrorMsg, setResponseErrorMsg] = useState([]);
  const [filePreview, setFilePreview] = useState(null);
  const { formState, handleSubmit, register } = useForm({
    mode: 'onSubmit'
  });
  const { errors } = formState;
  const validationSchema = postValidation();
  // const cloudinaryUrl = process.env.REACT_APP_CLOUDINARY_URL;

  useEffect(() => {
    setResponseErrorMsg([]);
  }, []);

  const adjustTextareaHeight = (e) => {
    e.target.style.height = '1px';
    e.target.style.height = e.target.scrollHeight + 'px';
  };

  const handlePreview = (e) => {
    console.log(e.target.files[0]);
    setFilePreview(URL.createObjectURL(e.target.files[0]));
  };

  const onSubmit = async (formData) => {
    setResponseErrorMsg([]);
    setLoading(true);
    console.log(formData);
    console.log(formState);
    setLoading(false);
    // createPost(formData)
    //   .catch((err) => setResponseErrorMsg(err))
    //   .finally(() => setLoading(false));
  };

  return (
    <PostContainer>
      <form className={styles.PostForm} onSubmit={handleSubmit(onSubmit)}>
        <img
          // src={`${cloudinaryUrl}/${currentUser.profilePicPath}`}
          src={defaultProfilePic}
          alt=''
          className={styles.user_pic}
        />
        <div>
          <textarea
            onInput={(e) => adjustTextareaHeight(e)}
            id='content'
            className={`form-textarea ${styles.content_textarea} ${
              errors.content && 'error'
            }`}
            {...register('content', { validate: validationSchema.content })}
          />
          <span className='form-alert'>{errors.content?.message}</span>
          {!!filePreview && (
            <img className={styles.image_preview} src={filePreview} alt='' />
          )}
          {responseErrorMsg.length > 0 && (
            <ul className='alert alert-danger'>
              {responseErrorMsg.map((message, index) => (
                <li className='alert-li' key={index}>
                  {message}
                </li>
              ))}
            </ul>
          )}

          <div className={styles.bottom_row}>
            <div>
              <label className='form-file-label' htmlFor='image'>
                {!formState.dirtyFields.image
                  ? 'Ajouter une image'
                  : `Modifier l'image`}
              </label>
              {!!errors.image && (
                <span className={`form-alert ${styles.image_error}`}>
                  {errors.image?.message}
                </span>
              )}
            </div>
            <input
              type='file'
              accept='image/*'
              id='image'
              className='form-file-input'
              onInput={handlePreview}
              {...register('image', { validate: validationSchema.image })}
            />

            {isLoading ? (
              <h2>Loader</h2>
            ) : (
              <input
                type='submit'
                value='Publier'
                className={`${styles.submit_btn} btn btn-primary-grey`}
              />
            )}
          </div>
        </div>
      </form>
    </PostContainer>
  );
};

export default PostForm;

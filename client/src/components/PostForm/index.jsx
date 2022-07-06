import styles from './PostForm.module.css';
import { useContext, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { usePost } from 'hooks/usePost';
import { UserContext } from 'contexts/UserContext';
import { postValidation } from 'utils/validationSchemas.utils';
import PostContainer from 'components/PostContainer';
import defaultProfilePic from 'assets/images/default-profile-pic.jpg';
import Loader from 'components/Loader';

const PostForm = () => {
  const { createPost } = usePost();
  const { currentUser } = useContext(UserContext);
  const [isLoading, setLoading] = useState(false);
  const [responseErrorMsg, setResponseErrorMsg] = useState([]);
  const [filePreview, setFilePreview] = useState(null);
  const { formState, handleSubmit, register, reset } = useForm({
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
    e.target.style.height = 0.5 + e.target.scrollHeight + 'px';
  };

  const handlePreview = (e) => {
    if (e.target?.files?.[0]) {
      setFilePreview(URL.createObjectURL(e.target.files[0]));
    }
  };

  const onSubmit = async (data) => {
    setResponseErrorMsg([]);
    setLoading(true);
    const formData = new FormData();
    formData.append('content', data.content);
    formData.append('image', data.image[0]);
    createPost(formData)
      .then(() => {
        reset({ content: '', image: [] });
        setFilePreview(null);
      })
      .catch((err) => setResponseErrorMsg(err))
      .finally(() => setLoading(false));
  };

  return (
    <PostContainer>
      <form className={styles.PostForm} onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.top_row}>
          <img
            // src={`${cloudinaryUrl}/${currentUser.profilePicPath}`}
            src={defaultProfilePic}
            alt=''
            className={styles.user_pic}
          />

          <span>
            {currentUser.firstname} {currentUser.lastname}
          </span>
        </div>

        <textarea
          id='content'
          className={`form-textarea ${styles.content_textarea} ${
            errors.content && 'error'
          }`}
          onInput={(e) => adjustTextareaHeight(e)}
          {...register('content', { validate: validationSchema.content })}
        />

        {!!errors.content?.message && (
          <span className='form-alert'>{errors.content.message}</span>
        )}

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

            {!!errors.image?.message && (
              <span className={`form-alert ${styles.image_error}`}>
                {errors.image.message}
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
            <Loader />
          ) : (
            <input
              type='submit'
              value='Publier'
              className={`${styles.submit_btn} btn btn-primary-grey`}
            />
          )}
        </div>
      </form>
    </PostContainer>
  );
};

export default PostForm;

import styles from './PostForm.module.css';
import { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import usePost from 'hooks/usePost';
import { AuthContext } from 'contexts/AuthContext';
import { postValidator } from 'utils/validationSchemas.utils';
import PostContainer from 'components/Posts/PostContainer';
import Loader from 'components/Loader';
import EmojiPicker from 'components/EmojiPicker';
import IconDelete from 'components/Icons/IconDelete';
import defaultProfilePic from 'assets/images/default-profile-pic.jpg';

const PostForm = ({
  postId,
  content,
  postPicPath,
  editMode,
  setEditMode,
  setPostData,
  refreshPostsData
}) => {
  const { currentUser } = useContext(AuthContext);
  const [isLoading, setLoading] = useState(false);
  const [responseErrorMsg, setResponseErrorMsg] = useState([]);
  const [imagePreview, setImagePreview] = useState(null);
  const [imageDeleted, setImageDeleted] = useState(false);
  const { createPost, updatePost } = usePost();
  const validationSchema = postValidator();
  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    setFocus,
    reset,
    formState: { errors }
  } = useForm({ mode: 'onSubmit' });

  const profilePicUrl = currentUser.profilePicPath
    ? `${process.env.REACT_APP_IMAGES_URL}/${currentUser.profilePicPath}`
    : defaultProfilePic;

  const adjustTextareaHeight = (e) => {
    e.target.style.height = '1px';
    e.target.style.height = e.target.scrollHeight + 'px';
  };

  const deleteImage = () => {
    setImageDeleted(true);
    setImagePreview(null);
    setValue('image', []);
    setFocus('content');
  };

  const handleFileInput = (e) => {
    if (e.target?.files?.[0]) {
      setImageDeleted(false);
    } else {
      e.target.files = getValues('image');
    }
    setImagePreview(URL.createObjectURL(e.target.files[0]));
  };

  const handleEmoji = (emoji) => {
    const value = getValues('content');
    setValue('content', `${value}${emoji.native}`);
    setFocus('content');
  };

  const onSubmit = async (data) => {
    setResponseErrorMsg([]);
    setLoading(true);
    const formData = new FormData();
    formData.append('content', data.content);
    formData.append('postPic', data.image[0]);
    editMode && formData.append('imageDeleted', imageDeleted);
    const submitMethod = editMode ? updatePost(postId, formData) : createPost(formData);
    submitMethod
      .then((updatedPost) => {
        reset({ content: '', image: [] });
        setImagePreview(null);
        if (editMode) {
          setPostData(updatedPost);
          setEditMode(false);
        } else {
          refreshPostsData();
        }
      })
      .catch((err) => setResponseErrorMsg(err))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    setResponseErrorMsg([]);
    if (editMode) {
      setValue('content', content);
      setFocus('content');
      postPicPath && setImagePreview(`${process.env.REACT_APP_IMAGES_URL}/${postPicPath}`);
    }
  }, []);

  return (
    <PostContainer>
      <form className={styles.PostForm} onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.topRow}>
          <Link to={`/profile/${currentUser.id}`}>
            <img src={profilePicUrl} alt='' className={styles.userPic} />
          </Link>

          <Link to={`/profile/${currentUser.id}`}>
            {currentUser.firstname} {currentUser.lastname}
          </Link>
        </div>

        <div className={styles.textareaEmojiContainer}>
          <textarea
            placeholder={`Rediger un post...`}
            className={`form-textarea form-emoji-padding ${styles.contentTextarea} ${
              errors.content ? 'error' : ''
            }`}
            onInput={(e) => adjustTextareaHeight(e)}
            onFocus={(e) => adjustTextareaHeight(e)}
            {...register('content', { validate: validationSchema.content })}
          />
          <EmojiPicker onEmojiSelect={handleEmoji} />
        </div>

        {!!errors.content?.message && <span className='form-alert'>{errors.content.message}</span>}

        {!!imagePreview && (
          <div className={styles.imagePreviewContainer}>
            <img className={styles.imagePreview} src={imagePreview} alt='' />
            <button type='button' className={styles.deleteButton} onClick={deleteImage}>
              <IconDelete size={22} color='#ffffff' />
            </button>
          </div>
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

        <div className={styles.bottomRow}>
          <div>
            <label className='form-file-label' htmlFor={`image-${postId}`}>
              {!imagePreview ? 'Ajouter une image' : `Modifier l'image`}
            </label>

            {!!errors.image?.message && (
              <span className={`form-alert ${styles.imageError}`}>{errors.image.message}</span>
            )}
          </div>

          {isLoading && <Loader grey={true} />}
          <input
            type='file'
            accept='image/*'
            id={`image-${postId}`}
            className='form-file-input'
            onInput={handleFileInput}
            {...register('image', { validate: validationSchema.image })}
          />

          <input type='submit' value='Publier' className='btn btn-primary-grey' />
        </div>
      </form>
    </PostContainer>
  );
};

export default PostForm;

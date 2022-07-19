import styles from './PostForm.module.css';
import { useContext, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import usePost from 'hooks/usePost';
import { AuthContext } from 'contexts/AuthContext';
import { postValidator } from 'utils/validationSchemas.utils';
import PostContainer from 'components/Posts/PostContainer';
import defaultProfilePic from 'assets/images/default-profile-pic.jpg';
import Loader from 'components/Loader';
import EmojiPicker from 'components/EmojiPicker';
import IconDelete from 'components/Icons/IconDelete';

const PostForm = ({ postId, content, imagePath, setEditMode, setPostData, refreshPostList }) => {
  const { currentUser } = useContext(AuthContext);
  const { createPost, updatePost } = usePost();
  const [isLoading, setLoading] = useState(false);
  const [responseErrorMsg, setResponseErrorMsg] = useState([]);
  const [filePreview, setFilePreview] = useState(null);
  const [imageDeleted, setImageDeleted] = useState(false);
  const validationSchema = postValidator();
  const imagesUrl = process.env.REACT_APP_IMAGES_URL;
  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    setFocus,
    reset,
    formState: { errors }
  } = useForm({ mode: 'onSubmit' });

  useEffect(() => {
    setResponseErrorMsg([]);
    if (postId) {
      setValue('content', content);
      setFocus('content');
      imagePath && setFilePreview(`${imagesUrl}/${imagePath}`);
    }
  }, []);

  const adjustTextareaHeight = (e) => {
    e.target.style.height = '1px';
    e.target.style.height = e.target.scrollHeight + 'px';
  };

  const handleFileInput = (e) => {
    if (e.target?.files?.[0]) {
      setFilePreview(URL.createObjectURL(e.target.files[0]));
      setImageDeleted(false);
    } else {
      setFilePreview(null);
    }
  };

  const deleteImage = () => {
    setImageDeleted(true);
    setFilePreview(null);
    setValue('image', []);
  };

  const emojiHandler = (emoji) => {
    const value = getValues('content');
    setValue('content', `${value}${emoji.native}`);
    setFocus('content');
  };

  const onSubmit = async (data) => {
    setResponseErrorMsg([]);
    setLoading(true);
    const formData = new FormData();
    formData.append('content', data.content);
    formData.append('image', data.image[0]);
    postId && formData.append('imageDeleted', imageDeleted);
    const submitMethod = postId ? updatePost(postId, formData) : createPost(formData);
    submitMethod
      .then((res) => {
        reset({ content: '', image: [] });
        setFilePreview(null);
        if (postId) {
          setPostData(res);
          setEditMode(false);
        } else {
          refreshPostList();
        }
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

        <div className={styles.textarea_emoji_container}>
          <textarea
            placeholder={`Rediger un post...`}
            className={`form-textarea form-emoji-padding ${styles.content_textarea} ${
              errors.content ? 'error' : ''
            }`}
            onInput={(e) => {
              adjustTextareaHeight(e);
              console.log(e.target.selectionStart);
            }}
            onFocus={(e) => adjustTextareaHeight(e)}
            {...register('content', { validate: validationSchema.content })}
          />
          <EmojiPicker onEmojiSelect={emojiHandler} />
        </div>

        {!!errors.content?.message && <span className='form-alert'>{errors.content.message}</span>}

        {!!filePreview && (
          <div className={styles.image_preview_container}>
            <img className={styles.image_preview} src={filePreview} alt='' />
            <button type='button' className={styles.delete_button} onClick={deleteImage}>
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

        <div className={styles.bottom_row}>
          <div>
            <label className='form-file-label' htmlFor={`image-${postId}`}>
              {!filePreview ? 'Ajouter une image' : `Modifier l'image`}
            </label>

            {!!errors.image?.message && (
              <span className={`form-alert ${styles.image_error}`}>{errors.image.message}</span>
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

          <input
            type='submit'
            value='Publier'
            className={`${styles.submit_btn} btn btn-primary-grey`}
          />
        </div>
      </form>
    </PostContainer>
  );
};

export default PostForm;

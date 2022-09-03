import styles from './CommentForm.module.css';
import { useContext, useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import useComment from 'hooks/useComment';
import { commentValidator } from 'utils/validationSchemas.utils';
import { adjustTextareaHeight } from 'utils/layout.utils';
import { AuthContext } from 'contexts/AuthContext';
import IconSend from 'components/Icons/IconSend';
import defaultProfilePic from 'assets/images/default-profile-pic.jpg';
import Loader from 'components/Loader';

const CommentForm = ({
  content,
  commentId,
  postId,
  author,
  setPostData,
  editMode,
  setEditMode
}) => {
  const { currentUser } = useContext(AuthContext);
  const [isLoading, setLoading] = useState(false);
  const [responseErrorMsg, setResponseErrorMsg] = useState([]);
  const { createComment, updateComment } = useComment();
  const { formState, handleSubmit, register, reset, setFocus, setValue } = useForm({
    mode: 'onSubmit'
  });
  const { errors } = formState;
  const validationSchema = commentValidator;

  const textareaRef = useRef(null);
  const { ref, ...registerContentRest } = register('content', {
    validate: validationSchema.content
  });

  const commentAuthor = author ? author : currentUser;

  const profilePicUrl = commentAuthor.profilePicPath
    ? `${process.env.REACT_APP_IMAGES_URL}/${commentAuthor.profilePicPath}`
    : defaultProfilePic;

  const onSubmit = async (data) => {
    setResponseErrorMsg([]);
    setLoading(true);
    data.postId = postId;
    const submitMethod = editMode ? updateComment(commentId, data) : createComment(data);
    submitMethod
      .then((updatedPost) => {
        reset({ content: '' });
        !editMode && setTimeout(() => setFocus('content'), 0);
        editMode && setEditMode(false);
        setPostData(updatedPost);
      })
      .catch((err) => setResponseErrorMsg(err))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    setResponseErrorMsg([]);
    if (editMode) {
      setValue('content', content);
      adjustTextareaHeight(textareaRef.current);
    }
  }, []);

  return (
    <>
      <form className={styles.CommentForm} onSubmit={handleSubmit(onSubmit)}>
        <img
          className={styles.userPic}
          src={profilePicUrl}
          alt={`Photo de profil de ${commentAuthor.firstname} ${commentAuthor.lastname}`}
        />
        <label htmlFor={`comment-content-${postId}-${commentId || ''}`}>
          Ecrire un commentaire :
        </label>
        <textarea
          id={`comment-content-${postId}-${commentId || ''}`}
          placeholder='Commentaire...'
          className={`form-textarea ${styles.contentTextarea} ${errors.content ? 'error' : ''}`}
          onInput={(e) => adjustTextareaHeight(e.target)}
          {...registerContentRest}
          ref={(e) => {
            ref(e);
            textareaRef.current = e;
          }}
        />
        {isLoading ? (
          <Loader grey />
        ) : (
          <button type='submit' aria-label='Envoyer le commentaire' className={styles.submitBtn}>
            <IconSend size='32' />
          </button>
        )}
      </form>
      {errors.content?.message && <span className='form-alert'>{errors.content?.message}</span>}

      {editMode && (
        <button type='button' className='limit-text-btn' onClick={() => setEditMode(false)}>
          Annuler
        </button>
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
    </>
  );
};

export default CommentForm;

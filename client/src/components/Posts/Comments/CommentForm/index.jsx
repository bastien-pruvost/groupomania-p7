import styles from './CommentForm.module.css';
import { useContext, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import useComment from 'hooks/useComment';
import { commentValidator } from 'utils/validationSchemas.utils';
import { AuthContext } from 'contexts/AuthContext';
import IconSend from 'components/Icons/IconSend';
import defaultProfilePic from 'assets/images/default-profile-pic.jpg';
import Loader from 'components/Loader';

const CommentForm = ({ content, commentId, postId, setPostData, editMode, setEditMode }) => {
  const { currentUser } = useContext(AuthContext);
  const [isLoading, setLoading] = useState(false);
  const [responseErrorMsg, setResponseErrorMsg] = useState([]);
  const { createComment, updateComment } = useComment();
  const { formState, handleSubmit, register, reset, setFocus, setValue } = useForm({
    mode: 'onSubmit'
  });
  const { errors } = formState;
  const validationSchema = commentValidator;

  const profilePicUrl = currentUser.profilePicPath
    ? `${process.env.REACT_APP_IMAGES_URL}/${currentUser.profilePicPath}`
    : defaultProfilePic;

  const adjustTextareaHeight = (e) => {
    e.target.style.height = '1px';
    e.target.style.height = e.target.scrollHeight + 'px';
  };

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
      setFocus('content');
    }
  }, []);

  return (
    <>
      <form className={styles.CommentForm} onSubmit={handleSubmit(onSubmit)}>
        <img className={styles.userPic} src={profilePicUrl} alt='' />
        <textarea
          placeholder={`Commenter...`}
          className={`form-textarea ${styles.contentTextarea} ${errors.content ? 'error' : ''}`}
          onInput={(e) => adjustTextareaHeight(e)}
          onFocus={(e) => adjustTextareaHeight(e)}
          {...register('content', { validate: validationSchema.content })}
        />
        {isLoading ? (
          <Loader grey />
        ) : (
          <button type='submit' className={styles.submitBtn}>
            <IconSend size='32' />
          </button>
        )}
      </form>
      <span className='form-alert'>{errors.content?.message}</span>

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

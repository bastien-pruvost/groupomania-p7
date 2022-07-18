import { AuthContext } from 'contexts/AuthContext';
import { useComment } from 'hooks/useComment';
import { useContext, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import defaultProfilePic from 'assets/images/default-profile-pic.jpg';
import styles from './CommentForm.module.css';
import IconSend from 'components/Icons/IconSend';

const CommentForm = ({ content, commentId, postId, setPostData, setEditMode }) => {
  const { createComment, updateComment, deleteComment } = useComment();
  const { currentUser } = useContext(AuthContext);
  const [isLoading, setLoading] = useState(false);
  const [responseErrorMsg, setResponseErrorMsg] = useState([]);
  const { formState, handleSubmit, register, reset, setFocus, setValue } = useForm({
    mode: 'onSubmit'
  });
  const { errors } = formState;
  const validationSchema = true;

  useEffect(() => {
    setResponseErrorMsg([]);
    if (postId) {
      setValue('content', content);
    }
  }, []);

  const adjustTextareaHeight = (e) => {
    e.target.style.height = '1px';
    e.target.style.height = e.target.scrollHeight + 'px';
  };

  const onSubmit = async (data) => {
    setResponseErrorMsg([]);
    setLoading(true);
    const submitMethod = postId ? updateComment(commentId, data) : createComment(data);
    submitMethod
      .then((res) => {
        reset({ content: '' });
        setTimeout(() => setFocus('content'), 0);
        commentId && setEditMode(false);
        setPostData(res.post);
      })
      .catch((err) => setResponseErrorMsg(err))
      .finally(() => setLoading(false));
  };

  return (
    <>
      <form className={styles.CommentForm} onSubmit={handleSubmit(onSubmit)}>
        <img className={styles.user_pic} src={defaultProfilePic} alt='' />
        <textarea
          placeholder={`Commenter...`}
          className={`form-textarea ${styles.content_textarea} ${errors.content ? 'error' : ''}`}
          onInput={(e) => adjustTextareaHeight(e)}
          onFocus={(e) => adjustTextareaHeight(e)}
          {...register('content', { validate: validationSchema.content })}
        />
        <button type='submit' className={styles.submit_btn}>
          <IconSend size='32' />
        </button>
      </form>

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

import { UserContext } from 'contexts/UserContext';
import { useComment } from 'hooks/useComments';
import { useContext, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import defaultProfilePic from 'assets/images/default-profile-pic.jpg';
import styles from './CommentForm.module.css';
import IconSend from 'components/Icons/IconSend';

const CommentForm = ({ postId, setUpdatedPost }) => {
  const { createComment } = useComment();
  const { currentUser } = useContext(UserContext);
  const [isLoading, setLoading] = useState(false);
  const [responseErrorMsg, setResponseErrorMsg] = useState([]);
  const { formState, handleSubmit, register, reset, setFocus } = useForm({
    mode: 'onSubmit'
  });
  const { errors } = formState;
  const validationSchema = true;

  useEffect(() => {
    setResponseErrorMsg([]);
  }, []);

  const adjustTextareaHeight = (e) => {
    e.target.style.height = '1px';
    e.target.style.height = 0.5 + e.target.scrollHeight + 'px';
  };

  const onSubmit = async (data) => {
    setResponseErrorMsg([]);
    setLoading(true);
    data.postId = postId;
    console.log(data);
    createComment(data)
      .then((res) => {
        reset({ content: '' });
        setTimeout(() => setFocus('content'), 0);
        setUpdatedPost(res.post);
      })
      .catch((err) => setResponseErrorMsg(err))
      .finally(() => setLoading(false));
  };

  return (
    <>
      <form className={styles.CommentForm} onSubmit={handleSubmit(onSubmit)}>
        <img className={styles.user_pic} src={defaultProfilePic} alt='' />
        <textarea
          // id='commentContent'
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
